import React, { useEffect } from "react";
import { useContext } from "react";
import NoteContext from "../../context/notes/noteContext";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";


export default function ImageAdjuster({imageUrl,setEditImageUrl}) {
    const context = useContext(NoteContext)
    const {generateDownload,upload,asset,setAsset} = context
	// const date = new Date(1678563468 * 1000)
	// console.log(date.toUTCString())

	const inputRef = React.useRef();

	const triggerFileSelectPopup = () => inputRef.current.click();

	const [image, setImage] = React.useState(null);
	const [croppedArea, setCroppedArea] = React.useState(null);

	useEffect(() => {
	  if(imageUrl){
		setImage(imageUrl.url)
		
		

	  }
	  else{
		setImage(null)
		
	  }
	  
	  return () => {
		setImage(null)
		setZoom(1)
		setCrop({x:0,y:0})
		setCroppedArea(null)

	  }
	}, [imageUrl])

	

	
	
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);

	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

	const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result);
			});
		}
	};

	const onDownload = () => {
		generateDownload(image, croppedArea,imageUrl);
		setEditImageUrl(null)
		setImage(null)
		setZoom(1)
		setCrop({x:0,y:0})
		setCroppedArea(null)
		
	};

	

	return (
		<div style={{height:"40vh"}}>
		 <div className='container-cropper'>
				{image ? (
					<>
						<div className='cropper'>
							<Cropper
								image={image}
								crop={crop}
								zoom={zoom}
								aspect={1}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
							/>
						</div>

						<div className='slider'>
							<Slider
								min={1}
								max={3}
								step={0.1}
								value={zoom}
								onChange={(e, zoom) => setZoom(zoom)}
							/>
						</div>
					</>
				) : null}
			</div>
			
			

			<div className='container-buttons'>
				<input
					type='file'
					accept='image/*'
					ref={inputRef}
					onChange={onSelectFile}
					style={{ display: "none" }}
				/>
				<Button
					variant='contained'
					color='primary'
					onClick={triggerFileSelectPopup}
					style={{ marginRight: "10px" }}
				>
					Choose
				</Button>
				<Button variant='contained' color='secondary' onClick={onDownload}>
					Upload
				</Button>
              
			</div>
            
		</div>
	);
}
