// import React from 'react';
// import { useState } from 'react';
// import { Form, Select, Button, Upload } from 'antd';
// import axios from 'axios';
// const { Option } = Select;

// const BlogPost = () => {
//   const [inputs, setInputs] = useState({});
//   const [inputFile, setInputFile] = useState({});
//   const [form] = Form.useForm();

//   console.log(inputFile, 'inputs');

//   function hanldeInput(e) {
//     const nameInput = e.target.name;
//     const value = e.target.value;
//     setInputs((state) => ({ ...state, [nameInput]: value }));
//   }

//   const onAddTest = (values) => {
//     const getDataUser = localStorage.getItem('user');
//     const dataUser = JSON.parse(getDataUser);
//     let accessToken = dataUser.token;
//     let config = {
//       headers: {
//         Authorization: 'Bearer ' + accessToken
//       }
//     };

//     const sendTestData = async () => {
//       try {
//         const formData = new FormData();
//         formData.append('image', values.image.file);
//         formData.append('title', values.title);
//         formData.append('content', values.description);
//         formData.append('type', values.tag);
//         const response = await axios.post(
//           `http://localhost:3000/api/posts/create`,
//           formData,
//           config
//         );
//         console.log(response);
//         const data = response.data;
//         console.log(data);
//         form.resetFields(['description', 'title', 'content', 'image']);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     sendTestData();
//   };

//   return (
//     <section id="form">
//       {/* <form onSubmit={onAddTest} encType="multipart/form-data"> */}
//       <Form onFinish={onAddTest} form={form}>
//         <div className="upload-files-container">
//           <div style={{ width: '100%' }}>
//             <div className="row">
//               <div className="col-sm-5">
//                 <div className="blog-form">
//                   <h2>Blog Import Content</h2>
//                   <Form.Item name="title">
//                     <input
//                       type="text"
//                       placeholder="title"
//                       name="title"
//                       defaultValue={''}
//                       onChange={hanldeInput}
//                     />
//                   </Form.Item>
//                   <Form.Item style={{ width: '200px' }} name="tag" initialValue={'grammar'}>
//                     <Select>
//                       <Option value="grammar">Grammar</Option>
//                       <Option value="vocabulary">Vocabulary</Option>
//                     </Select>
//                   </Form.Item>
//                   <Form.Item name="description">
//                     <textarea
//                       placeholder="Describe content here..."
//                       rows={12}
//                       cols={46}
//                       defaultValue={''}
//                       onChange={hanldeInput}
//                       name="description"
//                     />
//                   </Form.Item>
//                 </div>
//               </div>
//               <div className="col-sm-2">
//                 <div className="center">
//                   <h2 className="or">&amp;</h2>
//                 </div>
//               </div>
//               <Form.Item name="image" label="Image" labelAlign="left">
//                 <Upload
//                   maxCount={1}
//                   listType="picture"
//                   accept=".png,.jpeg"
//                   beforeUpload={() => {
//                     return false;
//                   }}>
//                   <Button>Select File</Button>
//                 </Upload>
//               </Form.Item>
//             </div>
//           </div>
//           <div className="center">
//             <button type="submit" className="upload-button">
//               {' '}
//               Upload{' '}
//             </button>
//           </div>
//         </div>
//       </Form>
//     </section>
//   );
// };
// export default BlogPost;

import React from 'react';
import { useState } from 'react';
import { Form, Select, Button, Upload } from 'antd';
import axios from 'axios';
const { Option } = Select;

const BlogPost = () => {
  const [inputs, setInputs] = useState({});
  const [inputFile, setInputFile] = useState({});
  const [form] = Form.useForm();

  function hanldeInput(e) {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  }

  const onAddTest = (values) => {
    const getDataUser = localStorage.getItem('user');
    const dataUser = JSON.parse(getDataUser);
    console.log('dataUser: ', dataUser);
    let accessToken = dataUser.token;
    let config = {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    };

    const sendTestData = async () => {
      try {
        const formData = new FormData();

        formData.append('image', values.image.file);
        formData.append('title', values.title);
        formData.append('content', values.description);
        formData.append('type', values.tag);
        // formData.append('email', dataUser.data.email )
        const response = await axios.post(
          `http://localhost:3000/api/posts/create`,
          formData,
          config
        );
        console.log('formData: ', formData);
        console.log(response);
        const data = response.data;
        console.log(data);
        form.resetFields(['description', 'title', 'content', 'image']);
      } catch (error) {
        console.error(error);
      }
    };
    sendTestData();
  };

  return (
    // <section id="form">
    //   {/* <form onSubmit={onAddTest} encType="multipart/form-data"> */}
    //   <Form onFinish={onAddTest} form={form}>
    //     <div className="upload-files-container">
    //       <div style={{ width: '100%' }}>
    //         <div className="row">
    //           <div className="col-sm-5">
    //             <div className="blog-form">
    //               <h2>Blog Import Content</h2>
    //               <Form.Item name="title">
    //                 <input
    //                   type="text"
    //                   placeholder="title"
    //                   name="title"
    //                   defaultValue={''}
    //                   onChange={hanldeInput}
    //                 />
    //               </Form.Item>
    //               <Form.Item style={{ width: '200px' }} name="tag" initialValue={'Grammar'}>
    //                 <Select>
    //                   <Option value="Grammar">Grammar</Option>
    //                   <Option value="Vocabulary">Vocabulary</Option>
    //                 </Select>
    //               </Form.Item>
    //               <Form.Item name="description">
    //                 <textarea
    //                   placeholder="Describe content here..."
    //                   rows={12}
    //                   cols={46}
    //                   defaultValue={''}
    //                   onChange={hanldeInput}
    //                   name="description"
    //                 />
    //               </Form.Item>
    //             </div>
    //           </div>
    //           <div className="col-sm-2">
    //             <div className="center">
    //               <h2 className="or">&amp;</h2>
    //             </div>
    //           </div>
    //           <Form.Item name="image" label="Image" labelAlign="left">
    //             <Upload
    //               maxCount={1}
    //               listType="picture"
    //               accept=".png,.jpeg"
    //               beforeUpload={() => {
    //                 return false;
    //               }}>
    //               <Button>Select File</Button>
    //             </Upload>
    //           </Form.Item>
    //         </div>
    //       </div>
    //       <div className="center">
    //         <button type="submit" className="upload-button">
    //           {' '}
    //           Upload{' '}
    //         </button>
    //       </div>
    //     </div>
    //   </Form>
    // </section>
    <div></div>
  );
};
export default BlogPost;
