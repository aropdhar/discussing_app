import React, { useEffect, useState } from 'react'
import { IoIosSend } from 'react-icons/io'
import { MdEmojiEmotions } from 'react-icons/md'
import { getDatabase, ref, onValue , push, set, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment/moment';
import EmojiPicker from 'emoji-picker-react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { getStorage, ref as sref, uploadBytes,getDownloadURL,uploadString  } from "firebase/storage";


const Msgbox = () => {
    
    const storage = getStorage();
    const db = getDatabase();
    const data = useSelector((state) => state.logedindatauser.value)
    const activeuserdata = useSelector((state) => state.usermsgdata.value)
    const [msgvalue , setMsgvalue] = useState("");
    const [allmsg , setAllmsg] = useState([]);
    const [emojishow , setEmojishow] = useState(false);
    let [voicebox, setVoicebox] = useState(true)
    let [audiourl, setAudioUrl] = useState("");
    let [blob, setBlob] = useState("");

    
    
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
      
      const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        setAudioUrl(url);
        setBlob(blob);
      };

      let handleAudioUpload = () => {
        const audioStorageRef = sref(storage, 'voice/'+ Date.now());
        uploadBytes(audioStorageRef, blob).then((snapshot) => {
          getDownloadURL(audioStorageRef).then((downloadURL) => {
            set(push(ref(db, "message")), {
              senderid: data.uid,
              sendername: data.displayName,
              senderemail: data.email,
              receiveid: activeuserdata.senderid == data.uid ? activeuserdata.receiveid : activeuserdata.senderid,
              receivename: activeuserdata.senderid == data.uid ? activeuserdata.receivename : activeuserdata.sendername,
              receiveemail: activeuserdata.senderid == data.uid ?
              activeuserdata.senderemail : activeuserdata.senderemail,
              audio: downloadURL,
              date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
            }).then(() => {
              setAudioUrl("");
            });
          });
        });
      };
    

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
                <ScrollToBottom className="msg_body">
                    {allmsg.map((item , index)=>(
                        item.senderid == data.uid ? 

                            <div key={index} className="sendmsg_main">
                              {item.message ?

                                <p className='sendmsg'>{item.message}</p>
                              :
                              <audio className='sendaudio' controls src={item.audio}/>

                              }
                                <span className='date'>
                                  {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                                </span>
                            </div>
                        :

                        <div className="receivemsg_main">
                        {item.message ?

                          <p className='receivemsg'>{item.message}</p>
                        :

                        <audio className='receiveaudio' controls src={item.audio}/>

                        }
                            <span className='date'>
                                {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                            </span>
                        </div>
                    ))

                    }

                        
                </ScrollToBottom>
                <div className="footer_section">
                  {/* voice section start here */}
                    {audiourl && (
                        <div className="voice_send_wrapper">
                          <audio controls src={audiourl}></audio>
                          <div className='voice_btn_wrapper'>
                              <button
                                className=""
                                onClick={() => setAudioUrl("")}
                              >
                                Delete
                              </button>
                              <button
                                onClick={handleAudioUpload}
                                className=""
                              >
                                Send
                              </button>
                          </div>
                        </div>
                      )}
                  {/* voice section end here */}
                      <MdEmojiEmotions onClick={()=>setEmojishow(!emojishow)} className='footer_Emoji'/>
                      
                      <div style={{position: "absolute" , left: "20px" , bottom: "60px"}}>
                        <EmojiPicker onEmojiClick={handleemoji} open={emojishow}/>
                      </div>
                      
                      <AudioRecorder 
                        onRecordingComplete={addAudioElement}
                        audioTrackConstraints={{
                          noiseSuppression: true,
                          echoCancellation: true,
                        }} 
                        downloadFileExtension="mp3"
                      />

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
