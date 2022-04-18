class Campaign
  include Mongoid::Document
  include Mongoid::Timestamps

  field :campaign_name, type: String
  field :party, type: Array
  field :encounters, type: Array
end
