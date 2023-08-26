import React, { useState } from "react";
import Tesseract from "tesseract.js";
import "./App.css";

const App = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [image, setImage] = useState("");
	const [text, setText] = useState("");
	const [progress, setProgress] = useState(0);

	const handleSubmit = () => {
		setIsLoading(true);
		Tesseract.recognize(image, "eng", {
			logger: (m) => {
				console.log(m);
				if (m.status === "recognizing text") {
					setProgress(parseInt(m.progress * 100));
				}
			},
		})
			.catch((err) => {
				console.error(err);
			})
			.then((result) => {
				console.log(result.data);
				setText(result.data.text);
				setIsLoading(false);
			});
	};

	const handleChangeImage = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		} else {
			setImage(null);
			setText("");
		}
	};
	const downloadTxtFile = () => {
		const element = document.createElement("a");
		const file = new Blob([document.getElementById("myInput").value], {
			type: "text/plain",
		});
		element.href = URL.createObjectURL(file);
		element.download = "myFile.txt";
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	};

	return (
		<div className="container">
			<div className="App" style={{ height: "80vh" }}>
				<div className="heading">
					<h1 className="input-wrapper">Image To Text</h1>
					<p className="text-center slogan ">
						We present an online OCR (Optical Character Recognition) service to
						extract text from image. Upload photo to our image to text
						converter, click on convert and get your text file instantly.
					</p>
				</div>

				<div className="content">
					<div className="upload-section ">
						{isLoading && (
							<div className="progre">
								<progress className="probar" value={progress} max="100">
									{progress}%{" "}
								</progress>{" "}
								<p className="txt-pro">Converting:- {progress} %</p>
							</div>
						)}
						{!isLoading && !text && (
							<div className="input-field">
								<span class="drag-drop" id="js-drag-n-drop">
									Drag &amp; Drop, Upload or Paste image
								</span>

								<input
									required
									type="file"
									id="upload"
									className="input-wrapper"
									accept="image/*"
									onChange={handleChangeImage}
								/>
								<input
									type="button"
									onClick={handleSubmit}
									className="convert-btn"
									value="Convert to Text"
								/>
							</div>
						)}

						{!isLoading && text && (
							<div className="result">
								{image && (
									<div className="box-image">
										<img src={URL.createObjectURL(image)} alt="thumb" />
									</div>
								)}

								<textarea
									className="box-p"
									rows="30"
									id="myInput"
									value={text}
									onChange={(e) => setText(e.target.value)}
								></textarea>
								<div className="download">
									<button onClick={downloadTxtFile} className="download-btn">
										Download
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
