const supabase = require("../config/supabase");

class UserService {
  async createUser(userData) {
    const { data, error } = await supabase.from("users").insert([userData]).select();
    if (error) throw new Error(error.message);
    return data[0];
  }

  async getAllUsers() {
    const { data, error } = await supabase.from("users").select("*");
    if (error) throw new Error(error.message);
    return data;
  }

  async getUserById(id) {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
    if (error) throw new Error(error.message);
    return data;
  }

  async updateUser(id, userData) {
    const { data, error } = await supabase.from("users").update(userData).eq("id", id).select();
    if (error) throw new Error(error.message);
    return data[0];
  }

  async deleteUser(id) {
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { message: "User deleted successfully" };
  }
}

module.exports = new UserService();

