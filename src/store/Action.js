import { AUTHENTICATED, LOADING_END, LOADING_START, MESSAGE } from "./constant";

export const otpSend = (email) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });

  try {
    let backend_path = "/api/admin/signup";
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${backend_path}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: { message: result.message, status: "success", path: "" },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Registration failed",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({
      type: LOADING_END,
    });
  }
};

export const registerAdmin = (data) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });

  try {
    let backend_path = "/api/admin";
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${backend_path}/register`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.message || "Account Creation Succesfull",
          status: "success",
          path: "/auth/login",
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Registration failed",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({
      type: LOADING_END,
    });
  }
};

export const login = (data) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/login`,
      {
        method: "POST",

        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.message || "Login Succesfull",
          status: "success",
          path: "/dashboard",
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Login failed",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({
      type: LOADING_END,
    });
  }
};

export const authentication = () => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/authentication`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const result = await response.json();

    dispatch({
      type: AUTHENTICATED,
      payload: result.success,
    });
  } catch (error) {
    dispatch({
      type: AUTHENTICATED,
      payload: false,
    });
  } finally {
    dispatch({
      type: LOADING_END,
    });
  }
};

export const forgotPassword = (data) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });

  try {
    let backend_path = "/api/admin";
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${backend_path}/forgate-password`,
      {
        method: "POST",

        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.message || "An Email send",
          status: "success",
          path: `/auth/login`,
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Somthing wrong",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({
      type: LOADING_END,
    });
  }
};

export const resetPassword =
  (newPassword, confirmPassword, token) => async (dispatch) => {
    dispatch({
      type: LOADING_START,
    });

    try {
      let backend_path = "/api/admin";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${backend_path}/reset-password/${token}`,
        {
          method: "POST",

          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword, confirmPassword }),
        }
      );

      const result = await response.json();

      if (result.success) {
        dispatch({
          type: MESSAGE,
          payload: {
            message: result.message || "Password Reset Successfull",
            status: "success",
            path: `/auth/login`,
          },
        });
      } else {
        dispatch({
          type: MESSAGE,
          payload: {
            message: result.error || "Somthing wrong",
            status: "error",
            path: "",
          },
        });
      }
    } catch (error) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: error.message || "Something went wrong",
          status: "error",
          path: "",
        },
      });
    } finally {
      dispatch({
        type: LOADING_END,
      });
    }
  };

export const logout = () => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (response.ok) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Logout Success",
          status: "success",
          path: "",
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/update-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Password Updated Successfully!",
          status: "success",
          path: `/profile`,
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Failed to update password",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({ type: LOADING_END });
  }
};
