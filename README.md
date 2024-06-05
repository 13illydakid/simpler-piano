<a id="top"></a>
<p align="center">
  <img src="https://raw.githubusercontent.com/13illydakid/simpler-piano/public/images/logo192.png" width="100" height="100">
</p>
<div align="center">
  <a href="https://piano.billy-chiu.com"><h1>Simpler Piano</h1></a>

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Application is live at [piano.billy-chiu.com](https://piano.billy-chiu.com)

Hosted by [vercel.com](https://vercel.com/docs/getting-started-with-vercel/projects-deployments/)

</div>

<hr>

## Description

Simpler Piano is a web application built using Next.js that allows users to simulate playing the piano with live note
visuals. Can also be used simply as a media player.


<hr>

## Table of Contents

- [How to use](#how-to-use)
  - [Base Functionalities](#base-functions)
    - [Upload](#upload)
    - [Preview](#preview)
    - [Connecting external Piano Keyboard](#connect)
  - [Pages](#pages)
    - [Home](#home)
    - [Song Library](#library)
    - [Open Piano](#piano)
  - [Midi Player Settings](#settings)
    - [Speed](#speed)
    - [Left/Right Hand Toggole On/Off](#hands)
    - [Customizations](#custom)
    - [Toggle File Loop](#loop)
    - [Configure Track](#track)

  - [Upcoming Features](#upcoming)
    - [Public Domain API](#api)
- [Resources](#resources)
- [Available Scripts](#available-scripts)
- [Learn More](#learn-more)

<hr>
<h4 align="right" id="how-to-use">

[Back to top](#top)
</h4>
<u><h2 align="center" id="how-to-use"> How to use </h2></u>

<u><h3 align="" id="base-functions"> `Base Functions` </h3></u>
<a id="base-functions-upload"></a>
<div id="upload">

<p align="">
<img src="https://raw.githubusercontent.com/13illydakid/simpler-piano/public/images/song-upload.png" height="50px"
style="display: inline-block;">
</p>

Upload

- Either drag and drop or click to browse for a midi file from your system then upload. The file is stored in your web browser's memory and will still be found in the your library under the 'upload' category in future
  sessions.


</div>

<div id="preview">

<p align="">
<img src="https://raw.githubusercontent.com/13illydakid/simpler-piano/public/images/song-preview.png" height="50px"
style="display: inline-block;">
</p>

Preview

- Clicking on a file in the library list of songs will trigger a popup that displays a preview of the song.

- Click the play button in the center to start the song. This can also be used as a simple background media player.

</div>

<div id="connect">

<p align="">
<img src="https://raw.githubusercontent.com/13illydakid/simpler-piano/public/images/connect-midi.png" height="50px"
style="display: inline-block;">
</p>

Connect external Piano with midi cable

-

</div><br>

<h4 align="right" id="how-to-use">

[Back to top](#top)
</h4>

<u><h3 align="" id="pages"> `Pages` </h3></u>
</u>
<img src="https://raw.githubusercontent.com/13illydakid/simpler-piano/public/images/" width="100%">

<!-- -->
<a id="home"></a>
<p align="">
  <img src="https://raw.githubusercontent.com/13illydakid/simpler-piano/public/images/home.png" height="50px" style="display: inline-block;">
</p>

Home

- Shows a preview of a pre-selected track for demo purposes.


<a id="library"></a>
<p align="">
  <img src="https://raw.githubusercontent.com/13illydakid/simpler-piano/public/images/library.png" height="50px" style="display: inline-block;">
</p>

Library

- Library description


<a id="piano"></a>
<p align="">
  <img src="https://raw.githubusercontent.com/13illydakid/simpler-piano/public/images/piano-freeplay.png" height="50px" style="display: inline-block;">
</p>

Piano

- Simulates piano for freeplaying


<br>

<h4 align="right" id="how-to-use">

[Back to top](#top)
</h4>

<u><h3 align="" id="settings"> `Midi Player Settings` </h3></u>
</u>
<img src="https://raw.githubusercontent.com/13illydakid/simpler-piano/public/images/settings.png" width="100%">

<a id="speed"></a>
<p align="">
  <img src="https://raw.githubusercontent.com/13illydakid/simpler-piano/public/images/speed.png" width="300px" style="display: inline-block;">
</p>

Speed

- Can increase or decrease the speed of the song playing.


<a id="hands"></a>
<p align="">
  <img src="https://raw.githubusercontent.com/13illydakid/simpler-piano/public/images/hands.png" width="300px" style="display: inline-block;">
</p>

Toggle Left and Right hand notes


- Turn on or turn off left hand notes and/or right hand notes.

<a id="custom"></a>
<p align="">
  <img src="https://raw.githubusercontent.com/13illydakid/simpler-piano/public/images/" width="300px" style="display: inline-block;">
</p>

Custom

-

<a id="loop"></a>
<p align="">
  <img src="https://raw.githubusercontent.com/13illydakid/simpler-piano/public/images/custom.png" width="300px" style="display: inline-block;">
</p>

Loop

- Song will play in a loop continuosly.
- User is able to specify start and end parameters.

<a id="track"></a>
<p align="">
  <img src="https://raw.githubusercontent.com/13illydakid/simpler-piano/public/images/track.png" width="300px" style="display: inline-block;">
</p>

Customize track

-

<h4 align="right" id="how-to-use">

[Back to top](#top)
</h4>

<u><h3 align="" id="upcoming"> `Upcoming Features` </h3></u>
</u>

<a id="api"></a>
<p align="">
  <img src="https://raw.githubusercontent.com/13illydakid/simpler-piano/public/images/" width="300px" style="display: inline-block;">
</p>

Public Domain API

- Backend application that allows for public access of midi files.

<hr>

<h4 align="right" id="how-to-use">

[Back to top](#top)
</h4>



<hr>

<h4 align="right" id="how-to-use">

[Back to top](#top)
</h4>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

<hr>

<h4 align="right" id="how-to-use">

[Back to top](#top)
</h4>



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
