import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CountriesService {
  private readonly apiUrl = process.env.NAGER_API_URL + 'AvailableCountries';
  private readonly bordersApiUrl = process.env.NAGER_API_URL + 'CountryInfo';
  private readonly flagApiUrl = process.env.COUNTRIES_NOW_API + 'flag/images';
  private readonly populationApiUrl = process.env.COUNTRIES_NOW_API + 'population';

  async getCountries(): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl, {
        headers: {
          'accept': 'text/plain',
        },
      });
      return response.data; 
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw new HttpException(
        'Failed to fetch countries from external service.',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getCountryDetails(countryCode: string): Promise<any> {
    try {
      let populationCounts = [];
      const bordersResponse = await axios.get(`${this.bordersApiUrl}/${countryCode}`, {
        headers: { 'accept': 'text/plain' },
      });
  
      const borders = bordersResponse.data?.borders || [];
      const officialName = bordersResponse.data?.officialName || '';
      const commonName = bordersResponse.data?.commonName || '';
      let flag = '';
      let populationData = [];
  
      try {
        const flagResponse = await axios.post(
          this.flagApiUrl,
          { iso2: countryCode },
          { headers: { 'Content-Type': 'application/json' } },
        );
        flag = flagResponse.data?.data?.flag || '';
      } catch (flagError) {
        console.warn(`Failed to fetch flag for country ${countryCode}: ${flagError.message}`);
      }
  
      if (officialName) {
        try {
          const populationResponse = await axios.post(
            this.populationApiUrl,
            { country: commonName.toLowerCase() },
            { headers: { 'Content-Type': 'application/json' } },
          );
          populationData = populationResponse.data?.data?.populationCounts || [];
        } catch (populationError) {
          console.warn(`Failed to fetch population for country ${countryCode}: ${populationError.message}`);
        }
      }
  
      return {
        officialName,
        borders,
        flag,
        populationCounts: populationData,
      };
    } catch (error) {
      console.error('Error fetching country details:', error);
  
      if (error.response) {
        throw new HttpException(
          {
            message: error.response.data?.msg || 'Country not found or unavailable. Verify that you entered the correct country code.',
            error: 'External API Error',
          },
          HttpStatus.BAD_GATEWAY,
        );
      } else if (error.request) {
        throw new HttpException(
          {
            message: 'No response from external API',
            error: 'No API Response',
          },
          HttpStatus.GATEWAY_TIMEOUT,
        );
      } else {
        throw new HttpException(
          {
            message: error.message || 'An unknown error occurred',
            error: 'Internal Server Error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
