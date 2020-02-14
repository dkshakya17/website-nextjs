import React from 'react';
import Error from '../components/Error';
import withLayout from '../components/MyLayout';


class Page extends React.Component{
  constructor(props) {
    super(props);
  }
    render(){
      return <>
        {this.props.statusCode?<Error statusCode={this.props.statusCode} />: <Error statusCode={'something went wrong'} />}
      </>
    }
}


const pageWithLayout = withLayout(Page);
pageWithLayout.getInitialProps =  ({ res, err }) => {

  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return {props: {statusCode}};
}
export default pageWithLayout;
