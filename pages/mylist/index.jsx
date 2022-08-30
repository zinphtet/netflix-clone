import React from 'react'
import style from './mylist.module.css'
import CardContainer from '../../components/CardContainer/CardContainer'
import Navbar from '../../components/Navbar/Navbar'
import { fetchMyList } from '../../Hasura/hasura'
import { verifyToken } from '../../cookie/verifyToken';
export async function getServerSideProps(context) {
  const token = context.req.cookies.jwtToken;
  const { issuer } = verifyToken(token);
  
  const fetchedLists = await fetchMyList(token , issuer)

  const myListVideos = fetchedLists.map(({ videoId, favourited, watched }) => {
                                            return {
                                              videoId,
                                              favourited,
                                              title: watched,
                                              imgUrl: ` https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
                                            };
                                          }
                                        );

  // Pass data to the page via props
  return { props: { myListVideos :myListVideos|| []} }
}



const index = ({myListVideos}) => {
  return (
    <>
    <Navbar/>
    {
      myListVideos.length >0 ?
      <div className={style.mylist}>
       <CardContainer
				title="My Favourite List"
				cardSize="medium"
        data={myListVideos}
			/>
    </div> : 
    <div className={`container ${style.nolist}`}>
      No Favourite List
    </div>
    }
    
    </>
  )
}

export default index