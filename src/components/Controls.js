


const Controls =({handleUploadedImages})=>{
   
    return (
        
        
        
        <div className="mb-3" style={{width:300,textAlign:'start'}}>
	  <label htmlFor="formFile" className="form-label"> choose picture(s) below:</label>
	  <input className="form-control form-control-sm" id="formFile" type="file"  multiple onChange={handleUploadedImages} />
	</div>
    )
}

export default Controls