import StudentComponent from "../Student/StudentComponent";
import "./StudentContainer.css"
const StudentContainerComponent = (props) => {
    return (
        <>
            <div className="student_container">
                {
                    Array.isArray(props.datas)
                    &&
                    props.datas.map(datas =>
                        <StudentComponent key={datas.id}
                            name={datas.name}
                            age={datas.age}
                            address={datas.address}
                            id={datas.id}
                            role={props.role} 
                            setIsDeleted={props.setIsDeleted}
                            userId={props.userId}/>
                    )
                }
                {
                    !Array.isArray(props.datas)
                    &&
                    <StudentComponent key={props.datas.id}
                        name={props.datas.name}
                        id={props.datas.id}
                        address={props.datas.address}
                        age={props.datas.age}
                        role={props.role} 
                        setIsDeleted={props.setIsDeleted}
                        userId={props.userId}/>
                }
            </div>
        </>
    );
}

export default StudentContainerComponent;