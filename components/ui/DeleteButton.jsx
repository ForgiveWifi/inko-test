function DeleteButton({onClick}) {
  return (
    <>
      <button onClick={onClick} className="flexbox margin-left radius5 red-background" style={{ padding: "2px 6px" }}>
        delete
      </button>
    </>
  );
}

export default DeleteButton;