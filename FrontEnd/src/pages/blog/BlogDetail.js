// import { Link } from 'react-router-dom';
// import React from 'react';
// const BlogDetail = () => {

//   return (
//     <div style={{ margin: '0 20px' }}>
//       <div className="blog-post-area">
//         <div className="single-blog-post">
//           <h3>Girls Pink T Shirt arrived in store</h3>
//           <div className="post-meta">
//             <ul>
//               <li> Name User</li>
//             </ul>
//             {/* <span>
//   									<i class="fa fa-star"></i>
//   									<i class="fa fa-star"></i>
//   									<i class="fa fa-star"></i>
//   									<i class="fa fa-star"></i>
//   									<i class="fa fa-star-half-o"></i>
//   								</span> */}
//           </div>
//           <a style={{ display: 'flex', justifyContent: 'center' }}>
//             <img
//               src="https://vtv1.mediacdn.vn/thumb_w/1000/2022/10/27/lichwc-1-16668871327101375335294.png"
//               alt=""
//             />
//           </a>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
//             incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
//             exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
//             dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//           </p>{' '}
//           <br />
//           <p>
//             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
//             mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit
//             voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
//             inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
//           </p>{' '}
//           <br />
//           <p>
//             Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
//             consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
//           </p>{' '}
//           <br />
//           <p>
//             Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
//             velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam
//             aliquam quaerat voluptatem.
//           </p>
//         </div>
//       </div>
//       <div className="tag-area">
//         <ul className="tag">
//           <li style={{ marginRight: '5px' }}>TAG: </li>
//           <li>
//             <a className="tag-link" href>
//               Vocabulary
//             </a>
//           </li>
//         </ul>
//       </div>
//       <div className="response-area">
//         <h2>COMMENT</h2>
//         <ul className="media-list">
//           <li className="media">
//             <div className="media-body">
//               <ul className="sinlge-post-meta">
//                 <li>
//                   <i className="fa fa-user" />
//                   Janis Gallagher
//                 </li>
//               </ul>
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
//                 incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
//                 exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//               </p>
//             </div>
//           </li>
//           <li className="media">
//             <div className="media-body">
//               <ul className="sinlge-post-meta">
//                 <li>
//                   <i className="fa fa-user" />
//                   Janis Gallagher
//                 </li>
//               </ul>
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
//                 incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
//                 exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//               </p>
//             </div>
//           </li>
//         </ul>
//       </div>
//       {/*/Response-area*/}
//       <div className="replay-box">
//         <div className="row">
//           <div className="col-sm-12">
//             <h2>Leave a replay</h2>
//             <div className="text-area">
//               <div className="blank-arrow">
//                 <label>Your Name</label>
//               </div>
//               <span>*</span>
//               <textarea name="message" rows={11} defaultValue={''} />
//               <a style={{ marginBottom: '30px' }} className="btn btn-primary" href>
//                 post comment
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default BlogDetail;

import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const BlogDetail = () => {
  let params = useParams();
  let id = params.id;
  const [detail, setDetail] = useState({});
  const [image, setimage] = useState({});
  const [name, setName] = useState();
  const [cmt, setCmt] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/posts/detail/' + id).then((res) => {
      setDetail(res.data);
      setimage(res.data.image);
      setName(res.data.owner.email);
      setCmt(res.data.comments);
      console.log('res.data.comments: ', res.data.comments);
    });
  }, []);
  function renderListcomment() {
    if (cmt.length > 0) {
      return cmt.map((key, index) => {
        return (
          <ul className="media-list">
            <li className="media">
              <div className="media-body">
                <ul className="sinlge-post-meta">
                  <li>
                    <i className="fa fa-user" />
                    {key.email}
                  </li>
                </ul>
                <p>{key.content}</p>
              </div>
            </li>
          </ul>
        );
      });
    } else {
      return null;
    }
  }
  function postComment() {
    const [input, setInputs] = useState('');
    const getDataUser = localStorage.getItem('user');
    const dataUser = JSON.parse(getDataUser);
    const [arr, setArr] = useState([]);
    function hanldeInput(e) {
      const nameInput = e.target.name;
      const value = e.target.value;
      setInputs((state) => ({ ...state, [nameInput]: value }));
    }
    // useEffect(() => {
    //   setArr([
    //     cmt,
    //     {
    //       content: input.message,
    //       commentOwner: dataUser.data._id,
    //       email: dataUser.data.email
    //     }
    //   ]);
    // }, [input]);
    function post() {
      // setCmt(cmt.push());
      const arr = [
        {
          content: input.message,
          commentOwner: dataUser.data._id,
          email: dataUser.data.email
        }
      ];
      setCmt([...cmt, arr[0]]);
      let accessToken = dataUser.token;
      let config = {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      };

      const data = {
        id: id,
        comments: [...cmt, arr[0]]
      };

      axios.put('http://localhost:3000/api/posts/detail/' + id, data, config);
    }
    console.log('cmt: ', cmt);

    return (
      <div className="replay-box">
        <div className="row">
          <div className="col-sm-12">
            <h2>Leave a replay</h2>
            <div className="text-area">
              <div className="blank-arrow">
                <label>Your Name</label>
              </div>
              <span>*</span>
              <textarea onChange={hanldeInput} name="message" rows={11} defaultValue={''} />
              <a onClick={post} style={{ marginBottom: '30px' }} className="btn btn-primary" href>
                post comment
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function renderDetail() {
    return (
      <div style={{ margin: '0 77px' }}>
        <div className="blog-post-area">
          <div className="single-blog-post">
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: '900', fontSize: '30px', color: '#284664', margin: '0' }}>
                {detail.title}
              </p>
            </div>
            <div className="post-meta">
              <ul style={{ listStyle: 'none' }}>
                <li style={{ fontSize: '18px', textTransform: 'uppercase' }}>
                  <span
                    style={{ margin: '0 10px 0 0', fontSize: '28px' }}
                    class="material-symbols-outlined">
                    badge
                  </span>
                  {name}
                </li>
              </ul>
            </div>
            <a style={{ display: 'flex', justifyContent: 'center' }}>
              <img style={{ width: '600px', height: '500px' }} src={image.name} alt="" />
            </a>
            <p>{detail.content}</p>{' '}
          </div>
        </div>
        <div className="tag-area">
          <ul className="tag">
            <li style={{ marginRight: '5px' }}>TAG: </li>
            <li>
              <a className="tag-link" href>
                {detail.type}
              </a>
            </li>
          </ul>
        </div>
        <div className="response-area">
          <h2>COMMENT</h2>
          {renderListcomment()}
        </div>

        {/*/Response-area*/}
        {postComment()}
      </div>
    );
  }
  return <div style={{ margin: '0 20px' }}>{renderDetail()}</div>;
};
export default BlogDetail;
