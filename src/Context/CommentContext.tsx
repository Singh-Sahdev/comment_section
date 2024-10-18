import React, {createContext, useState} from 'react'


export interface IComment{
    content:string
    isLiked:boolean 
    isDisLiked:boolean 
    children:IComment[]
    id:string

}

export const commentContext = createContext([null,null])

const CommentContext = ({children}) => {

    const [comments, setComments] = useState<Comment[]>([])


  return (
    <commentContext.Provider value={[comments,setComments]}>
        {children}
    </commentContext.Provider>
  )
}

export default CommentContext