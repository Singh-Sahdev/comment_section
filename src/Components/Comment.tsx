import React, { useContext} from 'react'
import { FaReply } from 'react-icons/fa6'
import { commentContext } from '../Context/CommentContext'
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi'
import { RiDeleteBin5Line } from 'react-icons/ri'

interface CommentProps{
    id:string
    content:string
    isLiked:boolean
    isDisLiked:boolean
    inputRef:any
    setCurrentComment:any
    className:string
}

const Comment:React.FC<CommentProps> = ({setCurrentComment,id,content,isLiked,isDisLiked,inputRef, className}) => {

    const [comments,setComments] = useContext(commentContext)

    function updateCurrentComment(comments,propA,propB){
		if(!comments || !comments.length) return 
		for(let i = 0;i<comments.length;i++){
			if(comments[i].id == id){
				if(comments[i][propA]){
                    comments[i][propA]=false
                }
                else{
                    comments[i][propB] = false
                    comments[i][propA]=true
                }
			}
			updateCurrentComment(comments[i].children,propA,propB)

		}
	}



    const toggleStatus = (propA,propB)=>{

        let tempComments = [...comments]
        updateCurrentComment(tempComments,propA,propB)
		
		
		setComments(tempComments)

    }

    const handleReplyClick = ()=>{

        inputRef.current?.focus();
        inputRef.current.placeholder = 'Add Reply...';

        setCurrentComment(id)
        

    }

    function updateDeleteComment(comments){
		if(!comments || !comments.length) return [];
        const newComments = []
		for(let i = 0;i<comments.length;i++){
			if(comments[i].id != id){
                comments[i].children = updateDeleteComment(comments[i].children)
                newComments.push(comments[i])
				
			}

		}
        return newComments;
	}

    

    const handleDeleteClick = ()=>{
        setComments(updateDeleteComment(comments))
    }


  return (
    <div className={`w-[calc(100%-1rem)] text-black py-4 px-4  my-4 mx-2 rounded-xl  ${className}`}>
        <div className=' ml-2'>{content}</div>
        <button onClick={()=>toggleStatus('isLiked','isDisLiked')} className='rounded-full p-2 m-2 bg-blue-300 text-blue-800' >{
            isLiked? (<BiSolidLike size={20} />) : (<BiLike size={20} />)
        }</button>
            
        <button onClick={()=>toggleStatus('isDisLiked','isLiked')} className='rounded-full p-2 m-2 bg-blue-300 text-blue-800' >{
            isDisLiked? (<BiSolidDislike size={20} />) : (<BiDislike size={20} />)
        }</button>

        <button className='rounded-full p-2 m-2 bg-blue-300 text-blue-800' onClick={handleReplyClick} >
            <FaReply size={20} />
        </button>

        <button className='rounded-full p-2 m-2  bg-blue-300 text-blue-800' onClick={handleDeleteClick} >
            <RiDeleteBin5Line size={20} />
        </button>


    </div>
  )
}

export default Comment