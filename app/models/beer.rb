class Beer < ActiveRecord::Base
  has_many :check_ins
  has_many :users, through: :check_ins

  validates :name, presence: true, uniqueness: true
  validates :brewery, presence: true
  validates :style, presence: true

  def most_recent
    self.find(:all, :id => "id desc", :limit => 10)
  end
end
