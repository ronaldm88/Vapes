class Beer < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :brewery, presence: true
  validates :style, presence: true

  def most_recent
    self.find(:all, :id => "id desc", :limit => 10)
  end
end
