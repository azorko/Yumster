class SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user])
    if @user
      sign_in!(@user)
      redirect_to root_url
    else
      render json: ["Invalid email and/or password."].to_json, status: 422
    end
  end

  def destroy
    sign_out!
    redirect_to root_url
  end
end
