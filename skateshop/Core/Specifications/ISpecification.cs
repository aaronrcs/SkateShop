using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
    public interface ISpecification<T>
    {
         Expression<Func<T, bool>> Criteria {get; }
        // This property will act as a List of .Include() statements
         List<Expression<Func<T, object>>> Includes {get; }
    }
}