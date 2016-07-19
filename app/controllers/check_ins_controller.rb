class CheckInsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_check_in, only: [:show, :edit, :update]

  def index
    @check_ins = CheckIn.last(10)
    respond_to do |f|
      f.html { render :index }
      f.json { render json: @check_ins }
    end

  end

  def new
    @check_in = CheckIn.new
  end

  def create
    @check_in = current_user.check_ins.build(check_in_params)

    if @check_in.save
      redirect_to user_check_in_path(current_user, @check_in)
    else
      render :new
    end
  end

  private
    def check_in_params
      params.require(:check_in).permit(:beer_id, :rating, :comment, beer_attributes: [:name, :style, :brewery])
    end

    def beer_attributes_empty?
      check_in_params[:beer_attributes].values.all? { |v| v.blank? }
    end

    def set_check_in
      @check_in ||= CheckIn.find(params[:id])
    end

end
