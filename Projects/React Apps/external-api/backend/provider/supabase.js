require('dotenv').config();
// Import `dotenv` package and call the `config()` function to access the environment variables set within the `.env` file. 

const { createClient } = require('@supabase/supabase-js');
// Abstract the `createClient` functionality from the `supabase` package. 

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecret = process.env.SUPABASE_SECRET;
// Create two const variables `supabaseURL` and `supabaseSecret` with the value of the environment variables you created.

const supabase = createClient(supabaseUrl, supabaseSecret);
// Create a variable `supabase` and set the value to the execution of the `createClient` function passing in `supabaseUrl` and `supabaseSecret` variables as arguments. 

module.exports = supabase;
// Export the `supabase` variable. 
