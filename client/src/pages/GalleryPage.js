import React from 'react';
import { withRouter } from 'react-router';

const GalleryPage = () => {
  const images = new Array(32)
    .fill('https://picsum.photos/id/unique_id/500/400.jpg')
    .map((item, index) => item.replace('unique_id', Math.floor(index * Math.random() * 5)));

  const mappedImages = images.map((item) => (
    <img
      className="col-12 col-md-6 col-lg-4 mb-4"
      src={item}
      key={(Math.random() * 10000).toString(36)}
      alt="obrazek"
    />
  ));
  return (
    <div className="row">
      <ul className="list list-unstyled">{mappedImages}</ul>
    </div>
  );
};
export default withRouter(GalleryPage);
