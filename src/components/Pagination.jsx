import React from 'react';
import BootstrapPagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom';
import './Pagination.css';

function Pagination(props) {
  let { active, baseUrl } = props;
  let navigate = useNavigate();
  if (!active) {
    active = 1;
  }

  let items = [];
  for (let number = 1; number <= 7; number++) {
    items.push(
      <BootstrapPagination.Item
        key={number}
        active={number === Number(active)}
        id={active ? 'pagination-active' : null}
        onClick={() => {
          navigate(`${baseUrl}?page=${number}`);
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      >
        {number}
      </BootstrapPagination.Item>
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <BootstrapPagination className="Pagination">{items}</BootstrapPagination>
    </div>
  );
}

export default Pagination;
