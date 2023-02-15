
const RecipeVideo = (props) => {

  const {videoUrl} = props;

  const displayVideo = () => {
    const videoSrc = videoUrl.replace('watch?v=', 'embed/');
    
    return <div data-testid="RecipeVideo">
      <iframe width="560" height="315" src={videoSrc} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  }

  return <>
    {videoUrl && displayVideo()}
  </>
}

export default RecipeVideo;