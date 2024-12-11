/* eslint-disable no-useless-catch */
import axios from "axios";

const apiUrl = "http://127.0.0.1:8000";

export const loginUser = async (email, password) => {
  const loginEndpoint = "/api/login";
  const data = { email, password };

  try {
    const response = await axios.post(apiUrl + loginEndpoint, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Login Response:', response);  // Log the response to check

    // Perbaiki pengambilan token, karena server hanya mengirimkan 'token'
    const { token } = response.data;

    if (token) {
      // Simpan token di localStorage untuk autentikasi di request berikutnya
      localStorage.setItem("accessToken", token);
    } else {
      console.error('No token found in the response');
    }

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;  // Menghantarkan error untuk ditangani di frontend
  }
};



export const registerUser = async (username, email, password) => {
  const registerEndpoint = "/api/register";
  const data = {
    name: username,  // Perbaiki nama yang digunakan di data objek
    email: email,
    password: password,
  };

  try {
    const response = await axios.post(apiUrl + registerEndpoint, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;  // Menghantarkan error jika registrasi gagal
  }
};

export const logoutUser = async () => {
	const logoutEndpoint = "/api/logout";

	try {
		const accessToken = localStorage.getItem("accessToken");
		if (!accessToken) {
			throw new Error("access token not found");
		}

		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};

		const response = await axios.post(apiUrl + logoutEndpoint, null, {
			headers: headers,
		});

		if (response.status === 200) {
			localStorage.removeItem("accessToken");
			return { status: "Success", message: "Logout berhasil" };
		} else {
			throw new Error("Logout gagal");
		}
	} catch (error) {
		throw error;
	}
};

