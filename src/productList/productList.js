import React, { Component } from 'react';
import ProductDetails from './../productDetails/productDetails';
import { Link } from 'react-router-dom';
class ProductList extends Component
{
    constructor(props){
        super(props);
        this.state = {
            isError: false,
            error: '',
            isLoaded: false,
            products : [],
            showDetails:false,
            productDetailsData:null
          }
    }

    componentDidMount() {
        fetch("https://fakestoreapi.com/products")
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result);

              this.setState({
                isLoaded: true,
                isError : false,
                products: result,
                error: ''
              });
              
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error,
                isError : true
              });
            }
          )
      }

      changeRoutePath(item){
        //e.preventDefault(); 
        //this.history.push("/productDetails");
        console.log('changeRoutePath');
        this.setState({showDetails: true});
        this.setState({productDetailsData : item});
    }

      render() {
        const { isError, error, isLoaded, products  } = this.state;
        console.log("productList "+ products);
        if (isError) {
          return <div>Error: {error}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div>
                {products.length > 0 && !this.state.showDetails && 
                  products.map((item,index) => (
                    <Link to="/productDetails" 
                            onClick={() => this.changeRoutePath(item)}>
                    <div class="row"> 
                      <div class="column">
                        <h2>{item.title}</h2> <p>[ {item.category} ]  </p>
                        <img key={index} src={item.image} style={{height: "100px" , width: "100px" }}/>
                        <p>{item.description}</p>
                        <h2>{item.price} $</h2>
                      </div>
                    </div>
                    </Link>
                    
                  ))                  
                } 
                { 
                this.state.showDetails && 
                <ProductDetails data={this.state.productDetailsData} /> 
                }
           </div>
          );
        }
      }


}

export default ProductList