import React from 'react'
import style from './CardContainer.module.css'
import Card from '../Card/Card'



import ScrollContainer from 'react-indiana-drag-scroll'
const CardContainer = ({title="Disney" , cardSize='large' , data}) => {
  if(!data) return <div>Loading ....</div>
 
  const myData = data
  console.log("DATA FROM CARD CONTAINER" , myData)
  // console.log("")
  return (
    <div className={`container ${style.card_container}`}>
        <h3 className={style.title}>{title}</h3>
       <ScrollContainer className={style.card_wrapper} horizontal={true}>
        {/* <Card  card_type={cardSize} id={0} />
        <Card  card_type={cardSize} />
        <Card  card_type={cardSize} />
        <Card  card_type={cardSize} />
        <Card  card_type={cardSize} />
        <Card  card_type={cardSize} />
        <Card  card_type={cardSize} />
        <Card  card_type={cardSize} />
        <Card  card_type={cardSize} />
        <Card  card_type={cardSize} />
        <Card  card_type={cardSize} />
        <Card  card_type={cardSize} />
        <Card  card_type={cardSize} />
        <Card  card_type={cardSize} /> */}
        {
          myData.map(({...props},idx)=> <Card key={idx} id={idx} {...props} card_type={cardSize} />)
        }
      </ScrollContainer>
    </div>
  )
}

export default CardContainer