import ContentLoader from "react-content-loader"

const Skeleton = () => {
  return (
    <ContentLoader 
      speed={2}
      width={400}
      height={750}
      viewBox="0 0 400 750"
      backgroundColor="#f0f0f0"
      foregroundColor="#d8d8d8"

    >
      {/* Картинка */}
      <rect x="0" y="0" rx="20" ry="20" width="400" height="450" />
      
      {/* Имя мастера */}
      <rect x="20" y="470" rx="5" ry="5" width="200" height="25" />
      
      {/* Тату салон */}
      <rect x="20" y="510" rx="5" ry="5" width="180" height="20" />
      
      {/* Опыт */}
      <rect x="20" y="545" rx="5" ry="5" width="120" height="20" />
      
      {/* Цветные краски */}
      <rect x="20" y="580" rx="5" ry="5" width="250" height="20" />
      {/* <rect x="20" y="600" rx="5" ry="5" width="60" height="20" /> */}
      
      {/* Стили мастера */}
      <rect x="20" y="635" rx="5" ry="5" width="180" height="20" />
      
      {/* Кнопка */}
      <rect x="100" y="680" rx="25" ry="25" width="200" height="50" />

    </ContentLoader>
  )
}

export default Skeleton