using System;
using System.Linq.Expressions;
using Core.Models;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification()
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }

        /*
            x => x.Id == id gets passed to this BaseSpecification constructor:

            public BaseSpecification(Expression<Func<T, bool>> criteria)
            {
                Criteria = criteria;
            }
        */

        public ProductsWithTypesAndBrandsSpecification(int id) 
            : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}