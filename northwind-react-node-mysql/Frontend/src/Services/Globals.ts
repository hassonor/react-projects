// General globals for development and production: 
abstract class Globals {
    // ...
}

// General globals only for development:
class DevelopmentGlobals extends Globals {
    public productsUrl = "http://localhost:3001/api/products/";
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";
}

// General globals only for production:
class ProductionGlobals extends Globals {
    public productsUrl = "http://www.mysite.com/api/products/";
    public registerUrl = "http://www.mysite/api/auth/register/";
    public loginUrl = "http://www.mysite/api/auth/login/";
}

const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;