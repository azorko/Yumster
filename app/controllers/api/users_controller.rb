class Api::UsersController < Api::ApiController
  def new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      redirect_to root_url
    else
      render json: ["Invalid email and/or password."].to_json, status: 422
    end
  end
  
  def index
    @user = current_user
    render json: @user
  end
 
 # def index
 #   @users = User.all
 #   render json: @users
 # end
  
  def show
    @user = User.find(params[:id])
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :name)
  end
end
