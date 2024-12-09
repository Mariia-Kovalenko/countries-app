import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CountriesService {
  private readonly apiUrl = 'https://date.nager.at/api/v3/AvailableCountries';
  private readonly bordersApiUrl = 'https://date.nager.at/api/v3/CountryInfo';
  private readonly flagApiUrl = 'https://countriesnow.space/api/v0.1/countries/flag/images';
  private readonly populationApiUrl = 'https://countriesnow.space/api/v0.1/countries/population';

  // Method to fetch countries
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
        // Handle error response from the external API
        throw new HttpException(
          {
            message: error.response.data?.msg || 'Country not found or unavailable. Verify that you entered the correct country code.',
            error: 'External API Error',
          },
          HttpStatus.BAD_GATEWAY,
        );
      } else if (error.request) {
        // Handle no response from the external API
        throw new HttpException(
          {
            message: 'No response from external API',
            error: 'No API Response',
          },
          HttpStatus.GATEWAY_TIMEOUT,
        );
      } else {
        // Handle any other error (e.g., invalid request, internal error)
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
  

  // async getCountryDetails(countryCode: string): Promise<any> {
  //   try {
  //     let populationCounts = [];
  //     const bordersResponse = await axios.get(`${this.bordersApiUrl}/${countryCode}`, {
  //       headers: { 'accept': 'text/plain' },
  //     });
  //     const borders = bordersResponse.data?.borders || [];
  //     const officialName = bordersResponse.data?.officialName || '';
  //     const commonName = bordersResponse.data?.commonName || '';

  //     const flagResponse = await axios.post(
  //       this.flagApiUrl,
  //       { iso2: countryCode },
  //       { headers: { 'Content-Type': 'application/json' } },
  //     );

  //     const flag = flagResponse.data?.data?.flag || '';
      
  //     console.log('official name', officialName)

  //     if (officialName) {
  //       const populationResponse = await axios.post(
  //         this.populationApiUrl,
  //         { country: commonName.toLowerCase() },
  //         { headers: { 'Content-Type': 'application/json' } },
  //       );
  //       populationCounts = populationResponse.data?.data?.populationCounts || [];
  //     }
    
  //     return {
  //       officialName,
  //       borders,
  //       flag,
  //       populationCounts
  //     };
  //   } catch (error) {
  //     console.error('Error fetching country details:', error);
  //     if (error.response) {
  //       throw new HttpException(
  //         {
  //           message: error.response.data?.msg || 'Country not found or unavailable. Verify that you entered correct country code',
  //           error: 'External API Error',
  //         },
  //         HttpStatus.BAD_GATEWAY,
  //       );
  //     } else if (error.request) {
  //       throw new HttpException(
  //         {
  //           message: 'No response from external API',
  //           error: 'No API Response',
  //         },
  //         HttpStatus.GATEWAY_TIMEOUT,
  //       );
  //     } else {
  //       throw new HttpException(
  //         {
  //           message: error.message || 'An unknown error occurred',
  //           error: 'Internal Server Error',
  //         },
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }
  //   }
  // }
}
