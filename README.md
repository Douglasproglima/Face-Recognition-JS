# Face-Recognition-JS

## About This Project
In this project, face recognition for any image using AI.

This AI is able to recognize the name of every character in an image very quickly without much performance overhead.

I'm using the Face API JS library built on Tensor Flow to setup the face recognition.

This design can be used with any webcam or mobile camera.

## Server
IDE Visual Studio Code is used and the option "Open with Live Server".

## Low-end Devices Bug's
The video eventListener for play fires up too early on low-end machines, before the video is fully loaded, which causes errors to pop up from the Face API and terminates the script (tested on Debian [Firefox] and Windows [Chrome, Firefox]). Replaced by playing event, which fires up when the media has enough data to start playing.


## Concepts Covered:

- Using Face API to detect faces
- Drawing facial detections on a canvas
- Determining face identity using facial recognition