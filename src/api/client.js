import axios from 'axios';

var config = {
    method: 'get',
    url: 'https://api.todoist.com/rest/v1/tasks?project_id=2269074557',
    headers: { 
      'Authorization': 'Bearer be13c0b221e82aed847ef0db5389922aa7b2c067'
    }
  };

  let addConfig = {
    method: 'POST',
    url: 'https://api.todoist.com/rest/v1/tasks',
    headers: { 
      'Authorization': 'Bearer be13c0b221e82aed847ef0db5389922aa7b2c067', 
      'Content-Type': 'application/json'
    },
    data : {}
  };


export async function fetchActiveTasks(){
    let data = await axios(config).then((response) =>{
        return response.data;
    }).catch((error) =>{
        console.log(error);
        return error;
    });
    return data;
}

export async function addTask(newTask){
  addConfig.data = newTask;
  console.log('client config :' , addConfig);
  let data = await axios(addConfig).then((response) => {
    return response.data;
  }).catch((error) => {
    console.log(error);
    return error;
  });
  return data;
}

export async function updateTask(updates){
  addConfig.url = `https://api.todoist.com/rest/v1/tasks/${updates.id}`;
  addConfig.data = updates.data;
  await axios(addConfig);
}

export async function closeTask(taskId){
  let closeConfig = {
    method: 'POST',
    url: `https://api.todoist.com/rest/v1/tasks/${taskId}/close`,
    headers: { 
      'Authorization': 'Bearer be13c0b221e82aed847ef0db5389922aa7b2c067'
    }
  }
  await axios(closeConfig);
}

export async function addComment(newComment){
  let commentConfig = {
    method: 'POST',
    url: 'https://api.todoist.com/rest/v1/comments',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer be13c0b221e82aed847ef0db5389922aa7b2c067'
    },
    data : newComment
  };
  console.log('client commentconfig :' , commentConfig);
  let comment = await axios(commentConfig).then((response) => {
    console.log('client addcomment response : ' , response);
    return response.data;
  }).catch((error) => {
    console.log(error);
    return error;
  });
  return comment;
}

export async function fetchComments(taskId){
  const fetchConfig = {
    method: 'get',
    url: `https://api.todoist.com/rest/v1/comments?task_id=${taskId}`,
    headers: { 
      'Authorization': 'Bearer be13c0b221e82aed847ef0db5389922aa7b2c067'
    }
  };
  let allComments = await axios(fetchConfig).then((response) => {
    return response.data;
  }).catch((error) => {
    console.log(error);
    return error;
  })
  return allComments;
}