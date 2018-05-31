import firebase from 'firebase';
import 'babel-polyfill';
import instance from '../utils/axios';
import { actionRejectedPrompter, toastPrompter } from '../utils/alerts.sweetalert';
import { displayUploadedImage } from '../utils/mescill.utils';
import generateCenterUrl from '../helpers/generateCenterUrl';

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

const getAllCenters = centerQueries =>
  (dispatch) => {
    dispatch({ type: 'FETCH_CENTERS' });
    let url;
    if (!centerQueries) {
      url = '/api/v1/centers';
    } else {
      const generatedUrl = generateCenterUrl(centerQueries);
      url = generatedUrl.substring(0, generatedUrl.length - 1);
    }
    return instance.get(url)
      .then((res) => {
        dispatch({ type: 'FETCH_CENTERS_RESOLVED', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_CENTERS_REJECTED', payload: err.response.data });
      });
  };

const getACenter = (centerId, centerOnly) =>
  (dispatch) => {
    dispatch({ type: 'FETCHING_A_CENTER' });
    let url = `/api/v1/centers/${centerId}`;
    if (centerOnly) {
      url = `/api/v1/centers/${centerId}?centeronly=true`;
    }
    return instance.get(url)
      .then((res) => {
        dispatch({ type: 'FETCH_A_CENTER_RESOLVED', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_A_CENTER_REJECTED', payload: err.response.data });
      });
  };

const promptSeeCenter = centerId =>
  (dispatch) => {
    dispatch({ type: 'PROMPT_SEE_A_CENTER', centerId });
  };

const addCenter = centerData =>
  (dispatch) => {
    dispatch({ type: 'ADDING_CENTER' });
    return instance({
      method: 'POST',
      url: '/api/v1/centers',
      headers: { 'x-access-token': localStorage.getItem('x-access-token') },
      data: centerData,
    })
      .then((res) => {
        toastPrompter('Center Succesfully added');
        dispatch({ type: 'ADD_CENTER_RESOLVED', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_CENTER_REJECTED', payload: err.response.data });
        actionRejectedPrompter(err.response.data.error);
      });
  };

const clearErrors = () =>
  (dispatch) => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

const getRentalCostAndFacilities = costAndFacilities =>
  (dispatch) => {
    dispatch({ type: 'ADD_RENTAL_COST_AND_FACILITIES', payload: costAndFacilities });
  };

const getPrimaryCenterDetails = centerDetails =>
  (dispatch) => {
    dispatch({ type: 'ADD_PRIMARY_CENTER_DETAILS', payload: centerDetails });
  };

const uploadImageAndGetUrl = imageFile =>
  (dispatch) => {
    const storageRef = firebase.storage().ref();
    const file = imageFile.imageFile;
    const metadata = {
      contentType: file[0].type,
    };
    const uploadTask = storageRef.child(`images/${file[0].name}`).put(file[0], metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
    // including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      dispatch({ type: 'UPLOADING_CENTER_IMAGE', payload: { uploadProgress: progress, currentTask: uploadTask } });
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          dispatch({ type: 'UPLOADING_CENTER_IMAGE_PAUSED', payload: { uploadProgress: progress, currentTask: uploadTask } });
          break;
        case firebase.storage.TaskState.CANCEL: // or 'cancel'
          dispatch({ type: 'UPLOADING_CENTER_IMAGE_CANCELLED' });
          break;
        case firebase.storage.TaskState.RUNNING: // or 'cancel'
          dispatch({ type: 'UPLOADING_CENTER_IMAGE', payload: { uploadProgress: progress, currentTask: uploadTask } });
          break;
        default:
      }
    }, (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          dispatch({ type: 'UPLOAD_CENTER_IMAGE_REJECTED', payload: error });
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          dispatch({ type: 'UPLOADING_CENTER_IMAGE_CANCELLED' });
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
        default:
      }
    }, () => {
    // Upload completed successfully, now we can get the download URL
      const url = uploadTask.snapshot.downloadURL;
      dispatch({ type: 'UPLOAD_CENTER_IMAGE_RESOLVED', payload: { imageUrl: url } });
      displayUploadedImage(url);
    });
  };

const pauseUpload = task => (task.currentTask.pause());

const resumeUpload = task => (task.currentTask.resume());

const cancelUpload = task => (task.currentTask.cancel());

const modificationPrompt = centerToBeModified =>
  (dispatch) => {
    dispatch({ type: 'MODIFICATION_PROMPT', centerId: centerToBeModified });
  };

const modifyCenter = (detailsToBeModified, centerToBeModified) =>
  (dispatch) => {
    dispatch({ type: 'MODIFYING_CENTER' });
    return instance({
      method: 'PUT',
      url: `/api/v1/centers/${centerToBeModified}`,
      headers: { 'x-access-token': localStorage.getItem('x-access-token') },
      data: detailsToBeModified,
    })
      .then((res) => {
        dispatch({ type: 'MODIFY_CENTER_RESOLVED', payload: res.data });
        toastPrompter('Center has been modified successfully');
      })
      .catch((err) => {
        dispatch({ type: 'MODIFY_CENTER_REJECTED', payload: err.response.data });
        actionRejectedPrompter(err.response.data.error);
      });
  };

const imageChangePrompt = () =>
  (dispatch) => {
    dispatch({ type: 'IMAGE_CHANGE_PROMPT' });
  };

export {
  getAllCenters,
  clearErrors,
  getRentalCostAndFacilities,
  getPrimaryCenterDetails,
  uploadImageAndGetUrl,
  addCenter,
  pauseUpload,
  resumeUpload,
  cancelUpload,
  modificationPrompt,
  imageChangePrompt,
  modifyCenter,
  getACenter,
  promptSeeCenter,
};
