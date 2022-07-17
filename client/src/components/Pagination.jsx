import React, {useState} from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import _ from 'lodash';

function Pagination(props) {

    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(()=>{
        props.list(_(props.data)?.slice(0).take(pageSize).value());
      },[props.data]);
  
      useEffect(()=>{
        console.log(currentPage);
        const startIndex = (currentPage - 1)*pageSize;
        const paginated = _(props.data)?.slice(startIndex).take(pageSize).value();
        props.list(paginated);
    },[currentPage]);
  
      
    const pageSize = props.size;
  
    const pageCount = props.data ? Math.ceil(props.data?.length/pageSize) : 0;
  
    const pages = _.range(1, pageCount + 1);
  
    const paginationNext = () =>{
    if(currentPage < pages.length){
          setCurrentPage(prevValue => prevValue + 1 );
    }
    };
  
    const paginationPrevious = () =>{
    if(currentPage > 1){
          setCurrentPage(prevValue => prevValue - 1 );
    }
    };


    return (
    <div className='flex justify-center gap-4 items-center p-4'>
        <IconButton color='error' size='small' onClick={paginationPrevious}><ArrowBackIosIcon/></IconButton>
        <IconButton color='error' size='small' onClick={paginationNext}><ArrowForwardIosIcon/></IconButton>
    </div>
  )
}

export default Pagination;