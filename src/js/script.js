const imageUpload = document.getElementById('imageUpload')

//Matriz de Elementos
Promise.all([
    //Libraries Js faces Recognite and faces detection
    //Localiza o contorno do rosto
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    //Detecta qual é o rosto 
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    //Algoritmo que detecta o rosto das pessoas 
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models') 
]).then(start)

async function start() {
    const container = document.createElement('div')
    container.style.position = 'relative'
    document.body.append(container)
    
    document.body.append('Loaded')
    imageUpload.addEventListener('change', async () => {
        /*
        if (image) image.remove()
        if (canvas) canvas.remove()
        */
        const image = await faceapi.bufferToImage(imageUpload.files[0])
        container.append(image)

        const canvas = faceapi.createCanvasFromMedia(image)
        container.append(canvas)
        
        const displaySize = { width: image.width, height: image.height }
        faceapi.matchDimensions(canvas, displaySize)
        
        const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        //const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
        
        resizedDetections.forEach( detection => {
          const box = detection.detection.box
          //const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
          const drawBox = new faceapi.draw.DrawBox(box, { label: 'Face' })
          drawBox.draw(canvas)
        })
      })
    }

function loadLabeledImages(){
  /*const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark']*/  
  const labels = ['Black Widow', 'Captain America', 'Hawkeye', 'Hulk', 'Jim Rhodes', 'Thor', 'Tony Stark']

  return Promise.all(
    labels.map(async label => {
      for(let i = 1; i <= 2; i++){
        const img = await faceapi.fetchImage('https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg')
        const detections = await faceapi.detectionSingleFace(img)
        .withFaceLandmarks().withFaceDescriptors()

        descriptions.push(detections.descriptions)
      }

      return new faceapi.labeledFaceDescriptors(label, descriptions)
    })
  )
}