using System;
using System.Linq.Expressions;
using Core.Models;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        // Calling the base contructor to pass in a specific Criteria to retrieve/filter out certain data
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParams productParams)
        : base(x=> 
            (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
            (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
        )
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddOrderBy(x => x.Name);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);

            if (!string.IsNullOrEmpty(productParams.SortingQuery))
            {
                switch (productParams.SortingQuery)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        /*
            x => x.Id == id gets passed to BaseSpecification constructor
            as a specific Criteria:

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