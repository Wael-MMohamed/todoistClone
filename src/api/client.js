import axios from 'axios';


var config = {
    method: 'get',
    url: 'https://api.todoist.com/rest/v1/tasks?project_id=2269074557',
    headers: { 
      'Authorization': process.env.REACT_APP_API_TOKEN
    }
  };

  let addConfig = {
    method: 'POST',
    url: 'https://api.todoist.com/rest/v1/tasks',
    headers: { 
      'Authorization': process.env.REACT_APP_API_TOKEN, 
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
      'Authorization': process.env.REACT_APP_API_TOKEN
    }
  }
  await axios(closeConfig);
}

export async function deleteTask(taskId){
  let deleteConfig = {
    method: 'DELETE',
    url: `https://api.todoist.com/rest/v1/tasks/${taskId}`,
    headers: { 
      'Authorization': process.env.REACT_APP_API_TOKEN
    }
  }
  await axios(deleteConfig);
}

export async function addComment(newComment){
  let commentConfig = {
    method: 'POST',
    url: 'https://api.todoist.com/rest/v1/comments',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': process.env.REACT_APP_API_TOKEN
    },
    data : newComment
  };
  // console.log('client commentconfig :' , commentConfig);
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
      'Authorization': process.env.REACT_APP_API_TOKEN
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