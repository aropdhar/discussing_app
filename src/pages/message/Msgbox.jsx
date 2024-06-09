import React, { useEffect, useState } from 'react'
import { IoIosSend } from 'react-icons/io'
import { MdEmojiEmotions } from 'react-icons/md'
import { getDatabase, ref, onValue , push, set, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment/moment';
import EmojiPicker from 'emoji-picker-react';


const Msgbox = () => {
    
    const db = getDatabase();
    const data = useSelector((state) => state.logedindatauser.value)
    const activeuserdata = useSelector((state) => state.usermsgdata.value)
    const [msgvalue , setMsgvalue] = useState("");
    const [allmsg , setAllmsg] = useState([]);
    const [emojishow , setEmojishow] = useState(false);
    
    let handlemsg = () =>{
      
        set(push(ref(db, 'message')), {
            senderid: data.uid,
            sendername: data.displayName,
            senderemail: data.email,
            receiveid: activeuserdata.senderid == data.uid ? activeuserdata.receiveid : activeuserdata.senderid,
            receivename: activeuserdata.senderid == data.uid ? activeuserdata.receivename : activeuserdata.sendername,
            receiveemail: activeuserdata.senderid == data.uid ?
            activeuserdata.senderemail : activeuserdata.senderemail,
            message: msgvalue,
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
         }).then(()=>{
            
            setMsgvalue(" ");

         });
    }

    // all msg 

    useEffect(()=>{
        const addreqRef = ref(db, 'message');
        onValue(addreqRef, (snapshot) => {
          
          let arr = [];
          
          let activeid = data.uid == activeuserdata?.senderid ? activeuserdata?.receiveid : activeuserdata?.senderid 

          snapshot.forEach((item)=>{
            if((item.val().senderid == data.uid && item.val().receiveid == activeid) || (item.val().senderid == activeid && item.val().receiveid == data.uid)){   

              arr.push({...item.val() , id: item.key});

            }
            
          });
          
          setAllmsg(arr);
        });
      },[activeuserdata])

      let handleemoji = (e) =>{
        setMsgvalue(msgvalue + e.emoji);
      }

      let handleEnterpress = (e) =>{
          if(e.key == "Enter"){
            set(push(ref(db, 'message')), {
                senderid: data.uid,
                sendername: data.displayName,
                senderemail: data.email,
                receiveid: activeuserdata.senderid == data.uid ? activeuserdata.receiveid : activeuserdata.senderid,
                receivename: activeuserdata.senderid == data.uid ? activeuserdata.receivename : activeuserdata.sendername,
                receiveemail: activeuserdata.senderid == data.uid ?
                activeuserdata.senderemail : activeuserdata.senderemail,
                message: msgvalue,
                date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
             }).then(()=>{
                
                setMsgvalue("")
    
             });
          }
      }

  return (
    <>
    {!activeuserdata
        ?
            <div style={{margin: "100% 100%", width: "100%"}}>
                <h1>Please Select a User</h1>
            </div>
        :
            <div className="msg_main">
                <div className="msg_heading">
                    <div className="img_box"></div>
                    <div className='msg_heading_title'>
                        <h1>
                        {activeuserdata.receiveid == data.uid 

                        ?
                        activeuserdata.sendername

                        :

                        activeuserdata.receivename
                        }</h1>
                        <p>Active Now</p>
                    </div>
                </div>
                <div className="msg_body">
                    {allmsg.map((item , index)=>(
                        item.senderid == data.uid ? 

                            <div key={index} className="sendmsg_main">
                                <p className='sendmsg'>{item.message}</p>
                                <span className='date'>
                                  {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                                </span>
                            </div>
                        :

                        <div className="receivemsg_main">
                            <p className='receivemsg'>{item.message}</p>
                            <span className='date'>
                                {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                            </span>
                        </div>
                    ))

                    }

                        <div style={{position: "absolute" , left: "20px" , bottom: "20px"}}>
                        <EmojiPicker onEmojiClick={handleemoji} open={emojishow}/>
                        </div>

                    
                 
                </div>
                <div className="footer_section">
                      <MdEmojiEmotions onClick={()=>setEmojishow(!emojishow)} className='footer_Emoji'/>
                      
                       <input onKeyUp={handleEnterpress} value={msgvalue} onChange={(e)=>setMsgvalue(e.target.value)} type="text" placeholder='Enter Your Message'/>
                       {msgvalue.length > 0 &&

                        <IoIosSend onClick={handlemsg} className='footer_send_btn'/>

                       }
                    </div>
                </div>
    }
    </>
  )
}

export default Msgbox
