import { useEffect, useState } from 'react';
// import Table from './Table/Table';
import './App.css';

function App() {

  const [updatedData, setUpdatedData] = useState([]);
  const [data, setData] = useState(
    [
      { date: "2022-09-01", views: 100, article: "Article 1" },
      { date: "2023-09-01", views: 100, article: "Article 1" },
      { date: "2023-09-02", views: 150, article: "Article 2" },
      { date: "2023-09-02", views: 120, article: "Article 3" },
      { date: "2020-09-03", views: 200, article: "Article 4" }
    ]
  );
  // The main thing is we must not sort the given array itself. Copy that using spread operator and sort that copied array or else UI won't change.

  const handleDateSort = () => {
    const copiedArr = [...data];
    mergeSort(copiedArr, 0, copiedArr.length-1, "date");
    setUpdatedData(copiedArr);
    console.log(copiedArr);

    let n = 0, l = 0, r = 0 ;
    for(let i=1; i < copiedArr.length; i++) {
      if(copiedArr[i].date === copiedArr[i-1].date) {
        n = n+1;
      } else {
        if(n > 0) {
          console.log(n);
          l = i-n-1;
          r = i-1;
          console.log(l,r);
          mergeSort(copiedArr, l, r, "views");
          setUpdatedData(copiedArr);
          n=0;
        }
      }
      if(i === copiedArr.length-1 && n>0) { // this edge case is must because some identical rows may come last and it won't enter else block. Also, change the left and right of the range to be sorted. Abovel l, r are different.
        l = i-n;
        r = i;
        mergeSort(copiedArr, l, r, "views");
        setUpdatedData(copiedArr);
      }
    }
  }  
  
  const handleViewsSort = () => {
    const copiedArr = [...data];
    mergeSort(copiedArr, 0, copiedArr.length-1, "views");
    setUpdatedData(copiedArr)
    console.log(copiedArr);

    let n = 0, l = 0, r = 0 ;
    for(let i=1; i < copiedArr.length; i++) {
      if(copiedArr[i].views === copiedArr[i-1].views) {
        n = n+1;
      } else {
        if(n > 0) {
          console.log(n);
          l = i-n-1;
          r = i-1;
          console.log(l,r);
          mergeSort(copiedArr, l, r, "date");
          setUpdatedData(copiedArr);
          n=0;
        }
      } 
      if(i === copiedArr.length-1 && n>0) { 
        l = i-n;
        r = i;
        console.log(n, l, r);
        mergeSort(copiedArr, l, r, "date");
        setUpdatedData(copiedArr);
      }
    }
  }
  

  const mergeSort = (arr, left, right, field) => {

    if(left < right) {

      let mid = Math.floor((left+right)/2);

      mergeSort(arr, left, mid, field);
      mergeSort(arr, mid+1, right, field);
      merge(arr, left, mid, right, field);
    }
  }

  const merge = (arr, left, mid, right, field) => {
    const leftArr = arr.slice(left, mid+1);
    const rightArr = arr.slice(mid+1, right+1);

    let i=0, j=0, k=left;

    while(i < leftArr.length && j < rightArr.length) {
      if(field === "date") {
        if(new Date(leftArr[i][field]).getTime() >= new Date(rightArr[j][field]).getTime()) {
          arr[k] = leftArr[i];
          i++;
        } else {
          arr[k] = rightArr[j];
          j++;
        }
      } else if(field === "views") {
          if(leftArr[i][field] >= rightArr[j][field]) {
            arr[k] = leftArr[i];
            i++;
          } else {
            arr[k] = rightArr[j];
            j++;
          }
        }
      k++;
    }

    while(i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
    }

    while(j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
    }
  }

  // const handleDateSort = () => {
  //   const copiedArr = [...data];
  //   const sortedArr = copiedArr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  //   setUpdatedData(sortedArr);

  // }

  // const handleViewsSort = () => {
  //   const copiedArr = [...data];
  //   const sortedArr = copiedArr.sort((a, b) => b.views - a.views);
  //   setUpdatedData(sortedArr);
  // }

  // console.log(updatedcopiedArr);
  // console.log(copiedArr);

  return (
    <div className="App">
      <h1>Date and Views Table</h1>
      <button onClick={(e) => handleDateSort(e)}>Sort by Date</button>
      <button onClick={handleViewsSort}>Sort by Views</button>
      <table align="center">
        <thead>
          <tr>
            <th>Date</th>
            <th>Views</th>
            <th>Article</th>
          </tr>
        </thead>
        <tbody>
          {!updatedData.length > 0 ? data.map((rowObj,index) => {
            return <tr key={index}>
              <td>{rowObj.date}</td>
              <td>{rowObj.views}</td>
              <td>{rowObj.article}</td>
            </tr>
          }) : updatedData.map((rowObj,index) => {
            return <tr key={index}>
              <td>{rowObj.date}</td>
              <td>{rowObj.views}</td>
              <td>{rowObj.article}</td>
            </tr>
          })
        }
        </tbody>
      </table>
    </div>
  );
}

export default App;
