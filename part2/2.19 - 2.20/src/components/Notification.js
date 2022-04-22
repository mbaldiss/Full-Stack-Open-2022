const Notification = ({ message, typeMessage }) => {
    if (message === null) {
      return null
    }
  
    if(typeMessage === "success"){
        return (
            <div className="success">
              {message}
            </div>
          )
    }else if(typeMessage === "error"){
        return (
            <div className="error">
              {message}
            </div>
          )
    }else{
        return null
    }
    
  }

export default Notification;