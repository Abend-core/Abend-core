import multer from "multer"
import NewUUID from "./uuid";
import Module from "../models/module";
import User from "../models/user";


const storageModule: multer.StorageEngine = multer.diskStorage({
	destination: (cb: any) => {
	  cb(null, '../uploads/module'); 
	},
	filename: (cb: any) => {
  
	  const filename: string = getUUID('module');
	  
	  cb(null, filename);
	},
  });
  
  const storageProfil: multer.StorageEngine = multer.diskStorage({
	destination: (cb: any) => {
	  cb(null, '../uploads/profil');
	},
	filename: (cb: any) => {
  
	  const filename: string = getUUID('profil');
	  cb(null, filename);
	},
  });
  
  const uploadModule = multer({ storage: storageModule });
  const uploadProfil = multer({ storage: storageProfil });
  
  function getUUID(type: string){
	let reply = "";
	while (reply === "") {
	  const uuid = NewUUID();
	  if(type == 'module'){
		const user = Module.findByPk(uuid);
		if (!user) {
		  reply = uuid + ".png";
		}
	  }else{
		const user = User.findByPk(uuid);
		if (!user) {
		  reply = uuid + ".png";
		}
	  }
	} 
	return reply
  }

  export { uploadModule, uploadProfil };