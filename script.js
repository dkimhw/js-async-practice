///////////////////////////////////////

/*
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.
PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).
TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

*/
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

const loadNPause = async (imgPath) => {
  try {
    let img = await createImage(imgPath);
    console.log("Image loaded");
    await wait(2);
    img.style.display = 'none';
    console.log("Finished waiting")
  } catch (err) {
    throw new Error(err);
  }

}

// loadNPause('img-1.jpg').then(res => console.log('Waited 2 seconds'));

let imgArr = ['img-1.jpg', 'img-2.jpg', 'img-3.jpg']

const loadAll = async (imgArr) => {
  try {
    let imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);
    let imgsEl = await Promise.allSettled(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.value.classList.add('parallel'))
    return imgsEl;
  } catch (err) {
    throw new Error(err);
  }

}

let checkImgs = loadAll(imgArr);
