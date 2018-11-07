// Get visible expenses

export default (requests) => {
    return requests.sort((a, b) => {
        return (a.likes.length-a.dislikes.length) < (b.likes.length-b.dislikes.length) ? 1 : -1;
    });
  };
  