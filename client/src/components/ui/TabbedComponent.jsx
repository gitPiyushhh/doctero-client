function TabbedComponent({ metaData, activeTab, handleChangeTab }) {
    console.log("hii")
    
  return (
    <div className=" space-x-2 bg-stone-100 p-2 rounded absolute flex justify-center items-center top-4 left-[50%] translate-x-[-50%] w-[93%]">
      {metaData.map((el) =>
        el.name === activeTab ? (
          <span className="p-2 px-4 bg-blue-100 text-stone-700 w-[50%] rounded flex justify-center items-center cursor-pointer transition-all" onClick={() => handleChangeTab(el.name)}>
            {el.name}
          </span>
        ) : (
          <span className="p-2 px-4 text-stone-700 w-[50%] rounded flex justify-center items-center cursor-pointer transition-all" onClick={() => handleChangeTab(el.name)}>
            {el.name}
          </span>
        )
      )}
    </div>
  );
}

export default TabbedComponent;
