import NoBox from "../ui/NoBox";
import TagCard from "./TagCard";

function TagList({tags, toggleChange, setSelected}) {
  if (!tags) {
    return null
  }
  if (tags.length === 0) {
    return <NoBox text="No tags"/>
  }
  return (
    <>
      <div className="full-width" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginTop: 15}}>
        {
          tags.map((tag,i) => {
            return(
              <TagCard key={i} tag={tag} toggleChange={toggleChange} select={() => setSelected(i)}/>
            )
          })
        }
        { 
          tags.length < 3 ?
          Array(3 - tags.length).fill(0).map((_, i) => {
            return <div key={i}></div>
          }) :
          null
        }
      </div>
    </>
  );
}

export default TagList;