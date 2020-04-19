import { Component, OnInit } from '@angular/core';
import { selectedOnsiteRecord } from 'app/Models/selectedOnSiteRecord';
import {environment} from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientProfileService } from 'app/Services/client-profile.service';
import { ClientProfileResponseData } from 'app/Models/ClientProfileResponseData';
import { ProfileRequirementFormService, OnSiteCategoryApiResponseRecord, FurnitureCategoryApiResponseRecord, ModularCategoryApiResponseRecord } from 'app/Services/profile-requirement-form.service';

import { OnSiteRequirementFormData } from 'app/Models/OnSiteRequirementFormData';
import { FurnitureRequirementFormData } from 'app/Models/FurnitureRequirementFormData';
import { ModularRequirementFormData } from 'app/Models/ModularRequirementFormData';

import { OnSiteResponse } from 'app/Models/OnSiteResponse';
import { FurnitureResponse } from 'app/Models/FurnitureResponse';
import { ModularResponse } from 'app/Models/ModularResponse';
import { BOQRfFinalSubmitResponse } from 'app/Models/BOQRfFinalSubmitResponse';
import {BasicResponse} from '../../Models/BasicResponse';
@Component({
  selector: 'app-profile-requirement-form',
  templateUrl: './profile-requirement-form.component.html',
  styleUrls: ['./profile-requirement-form.component.scss']
})
export class ProfileRequirementFormComponent implements OnInit {
  env = environment;
  clientId: Number;
  clientProfileData: ClientProfileResponseData;
  finalSubmitData: BOQRfFinalSubmitResponse;

  // on-site
  addOnSiteCheck: boolean;
  onSiteCategory: String;
  onSiteEntity: String;
  onSiteAllEntityData: OnSiteRequirementFormData[];
  onSiteCategories: OnSiteCategoryApiResponseRecord[];
  onSiteSelectedRow: OnSiteRequirementFormData[];
  onSiteRows: OnSiteRequirementFormData[];
  onSiteResponseArray: OnSiteResponse[];
  onSiteTotal = 0;

  // furniture
  furnitureCategory: String;
  furnitureEntity: String;
  addFurnitureCheck: boolean;
  searchOptionsFurniture = {
    searchBy: 'item_code'
  };
  furnitureAllEntityData: FurnitureRequirementFormData[];
  furnitureCategories: FurnitureCategoryApiResponseRecord[];
  furnitureSelectedRow: FurnitureRequirementFormData[];
  furnitureRows: FurnitureRequirementFormData[];
  furnitureResponseArray: FurnitureResponse[];
  furnitureTotal = 0;
  selectedFurnitureEntry: FurnitureRequirementFormData;
  // modular
  addModularCheck: boolean;
  searchOptionsModular = {
    searchBy: 'item_code'
  };
  modularCategory: String;
  modularEntity: String;
  modularAllEntityData: ModularRequirementFormData[];
  modularCategories: ModularCategoryApiResponseRecord[];
  modularSelectedRow: ModularRequirementFormData[];
  modularRows: ModularRequirementFormData[];
  modularResponseArray: ModularResponse[];
  selectedModularEntry: ModularRequirementFormData;
  modularTotal = 0;

  constructor(
    private clientProfileservice: ClientProfileService,
    private profileRequirementFormService: ProfileRequirementFormService,
    private router: Router,
    private route: ActivatedRoute

  ) {

  }

  ngOnInit() {
    this.searchOptionsFurniture.searchBy = 'item_code';
    this.onSiteRows = [];
    this.onSiteResponseArray = [];
    this.furnitureRows = [];
    this.furnitureResponseArray = [];
    this.modularRows = [];
    this.modularResponseArray = [];
    this.finalSubmitData = new BOQRfFinalSubmitResponse();
    // get Id from URL
    this.route.queryParams.subscribe(params => {
      this.clientId = params.id;
      this.finalSubmitData.clientId = this.clientId;
      this.getClientSavedBOQDataByClientId();
    });
    // get Profile Data
    this.clientProfileservice.getProfile(this.clientId).subscribe(
      (response) => {
      if (response.success) {
        this.clientProfileData = response.data;
      }
    })
    // getOnSiteDataDetails in onSiteAllEntityData
    this.profileRequirementFormService.getOnSiteDataDetails('').
      subscribe(
        (response) => {
        if (response.success) {
          this.onSiteAllEntityData = response.data;
        }
      },
      (error) => {
        console.error('error in profileRequirementFormService.getOnSiteDataDetails')
    });

    // getOnSiteCategories in onSiteCategories
    this.profileRequirementFormService.getOnSiteCategories().
      subscribe(
        (response) => {
        if (response.success) {
          this.onSiteCategories = response.data;
        }
      },
      (error) => {
        console.error('error in profileRequirementFormService.getOnSiteCategories')
    });

    // getFurnitureDataDetails in furnitureAllEntityData
    this.profileRequirementFormService.getFurnitureDataDetails('').
    subscribe(
      (response) => {
      if (response.success) {
        this.furnitureAllEntityData = response.data;
      }
    },
    (error) => {
      console.log('error in profileRequirementFormService.getFurnitureDataDetails')
    });

    // getFurnitureCategories in furnitureCategories
    this.profileRequirementFormService.getFurnitureCategories().
      subscribe(
        (response) => {
        if (response.success) {
          this.furnitureCategories = response.data;
        }
      },
      (error) => {
        console.log('error in profileRequirementFormService.getFurnitureCategories')
    });

    // getModularDataDetails in modularAllEntityData
    this.profileRequirementFormService.getModularDataDetails('').
    subscribe(
      (response) => {
      if (response.success) {
        this.modularAllEntityData = response.data;
      }
    },
    (error) => {
      console.log('error in profileRequirementFormService.getModularDataDetails')
    });

    // getModularCategories in modularCategories
    this.profileRequirementFormService.getModularCategories().
      subscribe(
        (response) => {
        if (response.success) {
          this.modularCategories = response.data;
        }
      },
      (error) => {
        console.log('error in profileRequirementFormService.getModularCategories')
      });
  }

  getClientSavedBOQDataByClientId() {
    this.profileRequirementFormService.getClientSavedBOQData(this.clientId).subscribe(response => {
      console.log('profileRequirementFormService----->', response);
      if (response.success) {
        const data = response.data;
        // Fill furniture data
        data.furniture.forEach(record => {
          const tempFurnitureRecord = new FurnitureRequirementFormData();
          tempFurnitureRecord.id = record.id;
          tempFurnitureRecord.item_code = record.item_code;
          tempFurnitureRecord.item_type = record.item_type;
          tempFurnitureRecord.item_name = record.item_name;
          tempFurnitureRecord.item_description = record.item_description;
          tempFurnitureRecord.unit = record.unit;
          tempFurnitureRecord.rate = record.rate;
          tempFurnitureRecord.breadth = record.breadth;
          tempFurnitureRecord.length = record.length;
          tempFurnitureRecord.height = record.height;
          tempFurnitureRecord.main_rate = record.main_rate;
          tempFurnitureRecord.url = record.url;
          this.furnitureRows.push(tempFurnitureRecord);
          const tempFurnitureResponseRecord = new FurnitureResponse(record.id);
          tempFurnitureResponseRecord.quantity = record.quantity;
          tempFurnitureResponseRecord.total = record.total;
          this.furnitureResponseArray.push(tempFurnitureResponseRecord);
          this.addFurnitureCheck = true;
        });
        // Fill Modular Data
        data.modular.forEach(record => {
          const tempModularRecord = new ModularRequirementFormData();
          tempModularRecord.id = record.id;
          tempModularRecord.item_code = record.item_code;
          tempModularRecord.item_type = record.item_type;
          tempModularRecord.item_name = record.item_name;
          tempModularRecord.item_description = record.item_description;
          tempModularRecord.unit = record.unit;
          tempModularRecord.rate = record.rate;
          tempModularRecord.breadth = record.breadth;
          tempModularRecord.length = record.length;
          tempModularRecord.height = record.height;
          tempModularRecord.main_rate = record.main_rate;
          tempModularRecord.url = record.url;
          this.modularRows.push(tempModularRecord);
          const tempRecord = new ModularResponse(record.id);
          tempRecord.quantity = record.quantity;
          tempRecord.total = record.total;
          this.modularResponseArray.push(tempRecord);
          this.addModularCheck = true;
        });
        // Fill onsite data
        data.onsite.forEach(record => {
          const tempOnSiteRecord = new OnSiteRequirementFormData();
          tempOnSiteRecord.id = record.id;
          tempOnSiteRecord.item_type = record.item_type;
          tempOnSiteRecord.item_description = record.item_description;
          tempOnSiteRecord.unit = record.unit;
          tempOnSiteRecord.rate = record.rate;
          this.onSiteRows.push(tempOnSiteRecord);
          const tempOnsiteResponseRecord = new OnSiteResponse(record.id);
          tempOnsiteResponseRecord.height = record.height;
          tempOnsiteResponseRecord.length = record.length;
          tempOnsiteResponseRecord.width = record.width;
          tempOnsiteResponseRecord.quantity = record.quantity;
          tempOnsiteResponseRecord.total = record.total;
          this.onSiteResponseArray.push(tempOnsiteResponseRecord);
          this.addOnSiteCheck = true;
        });
      }
    });
  }
  addOnSiteEntry(selectedCategory, selectedEntity) {
    if (selectedCategory === 0) {
      alert('Please Select Category.')
    } else if (selectedEntity === 0) {
      alert('Please Select Entity.')
    } else {
      if (selectedCategory === 'allCatgeories') {
        this.onSiteRows.length = 0;
        this.onSiteResponseArray.length = 0;
        this.getOnSiteDataDetails('')
        this.onSiteCategory = '';
        this.onSiteEntity = '';
        setTimeout(() => {this.onSiteAllEntityData.map(entity => this.onSiteRows.push(entity))
        this.onSiteRows.map(entity => {
          const tempOnsiteResponseRecord = new OnSiteResponse(entity.id);
          this.onSiteResponseArray.push(tempOnsiteResponseRecord);
        })}, 1000);
        this.onSiteEntity = '';
      } else {
        if (this.onSiteRows.length === 115) {
          console.log('after add all button')
          this.onSiteRows.length = 0;
          this.onSiteResponseArray.length = 0;
          this.getOnSiteDataDetails(selectedCategory)
          this.onSiteSelectedRow = this.onSiteAllEntityData.filter(entity => (entity.item_description === selectedEntity))
          this.onSiteRows.push(this.onSiteSelectedRow[0])
          this.onSiteCategory = '';
          this.onSiteEntity = '';
          const tempOnsiteResponseRecord = new OnSiteResponse(this.onSiteSelectedRow[0].id);
          this.onSiteResponseArray.push(tempOnsiteResponseRecord)
        } else if (this.onSiteRows.filter(entity => entity.item_description == selectedEntity).length != 0) {
          this.onSiteCategory = '';
          this.onSiteEntity = '';
          return alert('You have already added this element.');
        } else {
          this.getOnSiteDataDetails(selectedCategory);
          this.onSiteSelectedRow = this.onSiteAllEntityData.filter(entity => (entity.item_description == selectedEntity))
          this.onSiteRows.push(this.onSiteSelectedRow[0]);
          this.onSiteCategory = '';
          this.onSiteEntity = '';
          const tempOnsiteResponseRecord = new OnSiteResponse(this.onSiteSelectedRow[0].id);
          this.onSiteResponseArray.push(tempOnsiteResponseRecord);
        }
      }
    }
  }

  onSiteDelete(id) {
    console.log(this.onSiteRows)
    this.onSiteRows = this.onSiteRows.filter(obj => obj.id != id)
    this.onSiteResponseArray = this.onSiteResponseArray.filter(obj => obj.id != id)
    this.onSiteTotal = 0;
    this.onSiteResponseArray.map(entity => this.onSiteTotal = this.onSiteTotal + entity.total)
    console.log(this.onSiteRows)
  }

  onSiteRefresh() {
    if (this.onSiteRows.length != 0) {
      if (confirm('All OnSite Added fields will be removed !')) {
        this.onSiteRows.length = 0;
        this.onSiteResponseArray.length = 0;
        this.onSiteTotal = 0;
        this.onSiteResponseArray.map(entity => this.onSiteTotal = this.onSiteTotal + entity.total)
        console.log('onsite refreshed')
        console.log('onSiteRowsData', this.onSiteRows)
        console.log('onSiteResponseData', this.onSiteResponseArray)
      }
    } else {
      alert('OnSite has no data for refresh')
    }
  }

  getOnSiteDataDetails(category) {
    this.profileRequirementFormService.getOnSiteDataDetails(category).
    toPromise().then(
      (response) => {
      if (response.success) {
        this.onSiteAllEntityData = response.data;
        console.log(this.onSiteAllEntityData)
      }
    }).catch(
    (error) => {
      console.log('error in profileRequirementFormService.getOnSiteDataDetails')
    }
    )
  }
  updateOnSiteTotalEvent(total, id) {
    console.log('* * * EVENT* * * *', this.onSiteResponseArray)
    this.onSiteResponseArray.filter( entity => entity.id == id).map(entity => entity.total = total)
    console.log('onSiteResponseArray after updating total', this.onSiteResponseArray)
    this.onSiteTotal = 0;
    this.onSiteResponseArray.map(entity => this.onSiteTotal = this.onSiteTotal + entity.total)
    console.log('>>>>>>>>>>>>>>>>>>onSite total:', this.onSiteTotal)
  }

  // furniture
  addFurnitureEntry(selectedEntity) {
    if (!selectedEntity) {
      alert('Please select entity!')
    } else if (this.filterFurnitureRows(selectedEntity).length !== 0) {
      alert('You have already added this element!');
    } else {
      this.furnitureSelectedRow = this.filterAllFurnitureData(selectedEntity);
      this.furnitureRows.push(this.furnitureSelectedRow[0]);
      const tempFurnitureResponseRecord = new FurnitureResponse(this.furnitureSelectedRow[0].id);
      this.furnitureResponseArray.push(tempFurnitureResponseRecord);
    }
  }

  filterAllFurnitureData(selectedEntity) {
    return this.furnitureAllEntityData.filter(entity => {
      if (this.searchOptionsFurniture.searchBy === 'item_code') {
        return entity.item_code === selectedEntity
      } else {
        return entity.item_description.replace(/\s/g, '') === selectedEntity.replace(/\s/g, '')
      }
    });
  }

  filterFurnitureRows(selectedEntity){
    return this.furnitureRows.filter(entity => {
      if (this.searchOptionsFurniture.searchBy === 'item_code') {
        return entity.item_code === selectedEntity
      } else {
        return (entity.item_description === selectedEntity)
      }
    });
  }

  furnitureDelete(id) {
    console.log(this.furnitureRows)
    this.furnitureRows = this.furnitureRows.filter(obj => obj.id != id)
    this.furnitureResponseArray = this.furnitureResponseArray.filter(obj => obj.id != id)
    this.furnitureTotal = 0;
    this.furnitureResponseArray.map(entity => this.furnitureTotal = this.furnitureTotal + entity.total)
    console.log(this.furnitureRows)
  }

  furnitureRefresh() {
    if (this.furnitureRows.length != 0) {
      if (confirm('All Furniture Added fields will be removed !')) {
        this.furnitureRows.length = 0;
        this.furnitureResponseArray.length = 0;
        this.furnitureTotal = 0;
        this.furnitureResponseArray.map(entity => this.furnitureTotal = this.furnitureTotal + entity.total)
        console.log('furniture refreshed')
        console.log('furnitureRowsData', this.furnitureRows)
        console.log('furnitureResponseData', this.furnitureResponseArray)
      }
    } else {
      alert('Furniture has no data for refresh')
    }
  }

  changeFurnitureSearchType(type) {
    // console.log('Furniture search type--->', type);
    this.searchOptionsFurniture.searchBy = type;
  }

  getFurnitureSuggestions(furnitureSearchTerm) {
    const term = furnitureSearchTerm.value;
    const type = 'item_code';
    this.profileRequirementFormService.searchFurniture(type , term).toPromise().then(
      (response) => {
        if (response.success) {
          this.furnitureAllEntityData = response.data;
          console.log('furniture search term results---> ', this.furnitureAllEntityData);
        }
      }).catch(
      (error) => {
        console.log('error in profileRequirementFormService.getFurnitureDataDetails')
      }
    );
  }

  getFurnitureDataDetails(category) {
    this.profileRequirementFormService.getFurnitureDataDetails(category).
    toPromise().then(
      (response) => {
      if (response.success) {
        this.furnitureAllEntityData = response.data;
        console.log(this.furnitureAllEntityData)
      }
    }).catch(
    (error) => {
      console.log('error in profileRequirementFormService.getFurnitureDataDetails')
    }
    )
  }
  updateFurnitureTotalEvent(total, id) {
    console.log('* * * EVENT* * * *', this.furnitureResponseArray)
    this.furnitureResponseArray.filter( entity => entity.id == id).map(entity => entity.total = total)
    console.log('furnitureResponseArray after updating total', this.furnitureResponseArray)
    this.furnitureTotal = 0;
    this.furnitureResponseArray.map(entity => this.furnitureTotal = this.furnitureTotal + entity.total)
    console.log('>>>>>>>>>>>>>>>>>>furniture total:', this.furnitureTotal)
  }

  // modular
  addModularEntry(selectedModular) {
    if(!selectedModular) {
      alert('Please Select Entity.')
    } else if (this.filterModularRows(selectedModular).length !== 0) {
      alert('You have already added this element.');
    } else {
      this.modularSelectedRow = this.filterModularAllEntityData(selectedModular);
      this.modularRows.push(this.modularSelectedRow[0]);
      const tempRecord = new ModularResponse(this.modularSelectedRow[0].id);
      this.modularResponseArray.push(tempRecord);
    }
  }

  filterModularRows(selectedModular){
    return this.modularRows.filter(entity => {
      if (this.searchOptionsModular.searchBy === 'item_code') {
        return entity.item_code === selectedModular
      } else {
        return entity.item_description.replace(/\s/g, '') === selectedModular.replace(/\s/g, '')
      }
    });
  }

  filterModularAllEntityData(selectedModular){
    return this.modularAllEntityData.filter(entity => {
      if (this.searchOptionsModular.searchBy === 'item_code') {
        return entity.item_code === selectedModular
      } else {
        return entity.item_description.replace(/\s/g, '') === selectedModular.replace(/\s/g, '')
      }
    });
  }

  modularDelete(id) {
    console.log(this.modularRows)
    this.modularRows = this.modularRows.filter(obj => obj.id != id)
    this.modularResponseArray = this.modularResponseArray.filter(obj => obj.id != id)
    this.modularTotal = 0;
    this.modularResponseArray.map(entity => this.modularTotal = this.modularTotal + entity.total)
    console.log(this.modularRows)
  }

  modularRefresh() {
    if (this.modularRows.length !== 0) {
      if (confirm('All Modular Added fields will be removed !')) {
        this.modularRows.length = 0;
        this.modularResponseArray.length = 0;
        this.modularTotal = 0;
        this.modularResponseArray.map(entity => this.modularTotal = this.modularTotal + entity.total)
    }
  } else {
      alert('Modular has no data for refresh')
    }
  }

  getModularDataDetails(category) {
    this.profileRequirementFormService.getModularDataDetails(category).
    toPromise().then(
      (response) => {
      if (response.success) {
        this.modularAllEntityData = response.data;
        console.log(this.modularAllEntityData)
      }
    }).catch(
    (error) => {
      console.log('error in profileRequirementFormService.getModularDataDetails')
    }
    )
  }
  changeModularSearchType(searchType){
    this.searchOptionsModular.searchBy = searchType;
  }
  updateModularTotalEvent(total, id) {
    // console.log('* * * EVENT* * * *', this.modularResponseArray)
    this.modularResponseArray.filter( entity => entity.id == id).map(entity => entity.total = total)
    console.log('modularResponseArray after updating total', this.modularResponseArray)
    this.modularTotal = 0;
    this.modularResponseArray.map(entity => this.modularTotal = this.modularTotal + entity.total)
    console.log('>>>>>>>>>>>>>>>>>>modular total:', this.modularTotal)
  }


  // finalSubmitButton
  sendFinalSubmitData() {
    this.finalSubmitData.onsite = this.onSiteResponseArray;
    this.finalSubmitData.furniture = this.furnitureResponseArray;
    this.finalSubmitData.modular = this.modularResponseArray;
    if (this.onSiteResponseArray.length !== 0 || this.furnitureResponseArray.length !== 0 || this.modularResponseArray.length !== 0 ) {
      console.log('FInal submit data---->>>>>', this.finalSubmitData)
      if (confirm('Do you want to submit?')) {
        this.profileRequirementFormService.sendFinalSubmitData(this.finalSubmitData)
        .subscribe(response => {
          if (response.success) {
            alert('Your Data has been Successfully Submitted!');
            // this.router.navigate(['/dashboard/designerClientMet']);
            console.log('final response after success', this.finalSubmitData)
          } else {
            console.log('final response after failure ', this.finalSubmitData)
          }
        })

      }
    } else {
      alert('Please add Atleast a Field')
    }
  }

  generateBOQPDF() {
    this.profileRequirementFormService.getPDFUrl(this.clientId).subscribe(response => {
      console.log('Generate PDF BOQ URL response ---->', response);
      const res = response as BasicResponse;
      if (res.success) {
        const filename = res.data.pdfUrl;
        // const url = this.env.backendURL + `/static/${filename}`;
        window.open(filename);
      }
    });
  }
}
