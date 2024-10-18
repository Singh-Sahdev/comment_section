import React,{Children, useContext, useId, useRef, useState} from "react";
import CommentContext, { IComment, commentContext } from "./Context/CommentContext";
import Comment from "./Components/Comment";
import { BiSend } from "react-icons/bi";


const App = () => {

	const [currentContent,setCurrentContent] = useState('')

	const [currentComment,setCurrentComment] = useState<string>('')

	const [comments,setComments] = useContext(commentContext)

	const ref = useRef(null)

	const generateRandomId = function(){
		return `${Math.floor(Math.random()*10000)}`
	}


	function updateCurrentComment(comments,newComment){
		if(!comments || !comments.length) return 
		for(let i = 0;i<comments.length;i++){
			if(comments[i].id == currentComment){
				comments[i].children.push(newComment)
				
				return
			}
			updateCurrentComment(comments[i].children,newComment)

		}
	}

	const handleButtonClick = ()=>{

		const newComment = {
			content:currentContent,
			isLiked:false,
			isDisLiked:false,
			children:[],
			id: generateRandomId()
		}


		let tempComments = [...comments]
		if(currentComment){
			updateCurrentComment(tempComments,newComment)
		}
		else{
			tempComments = [...comments,newComment]
		}
		
		setComments(tempComments)

		ref.current.placeholder = 'Add Comment...'
		setCurrentContent('')
		setCurrentComment('')

	}

	const renderComments = (comments:IComment[],depth:number)=>{

		if(!comments || !comments.length) return (<></>);

		let className = depth%2?'text-blue-700 bg-blue-400':'bg-blue-700 text-blue-50'

		return comments.map(comment => {
			const baseComment = <Comment className={className} setCurrentComment={setCurrentComment} inputRef={ref} key={comment.id} content={comment.content} isDisLiked={comment.isDisLiked} isLiked={comment.isLiked} id={comment.id} />
			const childComment = renderComments(comment.children,depth+1)

			return (
				<>
				{baseComment}  
				<div className={` w-[97%] ml-[3%]`}>
					{childComment}
				</div>
				</>
			)

		})

		

		
	}

	


    return (


		<div className="w-screen h-screen bg-gray-800 ">
			<h1 className="text-center text-white font-sans font-bold text-3xl p-3 ">Comment Section</h1>
			<div className=" h-[80%] w-full flex justify-center items-center" >
				 <div className="w-[80%] h-[100%]  overflow-x-hidden bg-blue-200">
				{
					comments && comments.map(comment => {
						const baseComment = <Comment className=" bg-blue-700 text-blue-50" setCurrentComment={setCurrentComment} inputRef={ref} key={comment.id} content={comment.content} isDisLiked={comment.isDisLiked} isLiked={comment.isLiked} id={comment.id} />
						const childComment = renderComments(comment.children,1)

						return (
							<>
							{baseComment}  
							<div className=" w-[97%] ml-[3%]">
								{childComment}
							</div>
							</>
						)

					})
				}
				</div>
			</div>

			<div className="w-full flex justify-center items-center p-3" >
				<input placeholder="Add Comment..." ref={ref} type="text" name="comment" className="mx-3 px-2 h-10 rounded w-[30%] min-w-60 text-2xl bg-blue-100 text-blue-900" value={currentContent} onChange={(e)=>setCurrentContent(e.target.value)} /> <button onClick={handleButtonClick} className="rounded-full p-2 border-none bg-blue-200"><BiSend size={20} /></button>
			</div>
			
		</div>

	)
};

export default App;
