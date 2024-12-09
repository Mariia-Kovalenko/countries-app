import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async getCountries() {
    return this.countriesService.getCountries();
  }

  @Get(':countryCode')
  async getCountryInfo(@Param('countryCode') countryCode: string) {
    try {
      const countryDetails = await this.countriesService.getCountryDetails(countryCode);
      return countryDetails;
    } catch (error) {
        if (error instanceof HttpException) {
            throw error;
          }
    
          throw new HttpException(
            {
              message: error.message || 'Failed to fetch country information',
              error: 'Internal Server Error',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }
}
