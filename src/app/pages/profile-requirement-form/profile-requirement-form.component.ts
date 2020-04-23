import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {environment} from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientProfileService } from 'app/Services/client-profile.service';
import { ClientProfileResponseData } from 'app/Models/ClientProfileResponseData';
import { ProfileRequirementFormService, OnSiteCategoryApiResponseRecord, FurnitureCategoryApiResponseRecord, ModularCategoryApiResponseRecord } from 'app/Services/profile-requirement-form.service';

import { OnSiteRequirementFormData } from 'app/Models/OnSiteRequirementFormData';
import { FurnitureRequirementFormData } from 'app/Models/FurnitureRequirementFormData';
import { ModularRequirementFormData } from 'app/Models/ModularRequirementFormData';
import { ClientRoom } from 'app/Models/BOQ/ClientRoom';
import { OnSiteResponse } from 'app/Models/OnSiteResponse';
import { FurnitureResponse } from 'app/Models/FurnitureResponse';
import { ModularResponse } from 'app/Models/ModularResponse';
import { BOQRfFinalSubmitResponse } from 'app/Models/BOQRfFinalSubmitResponse';
import {BasicResponse} from '../../Models/BasicResponse';
import {concat} from 'rxjs-compat/operator/concat';
import { FinalRequestBOQ} from '../../Models/BOQ/FinalRequest';

@Component({
  selector: 'app-profile-requirement-form',
  templateUrl: './profile-requirement-form.component.html',
  styleUrls: ['./profile-requirement-form.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ProfileRequirementFormComponent implements OnInit {
  env = environment;
  clientId: Number;
  pageName: String;
  clientProfileData: ClientProfileResponseData;
  finalSubmitData: BOQRfFinalSubmitResponse;
  recordSearchOption = {
    itemCode: 'item_code',
    itemDescription: 'item_description'
  }

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
  searchOnSite = {
    categories: [],
    entities: []
  };

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

  // Toast
  toastMsgs = {
    internalServerError: 'Internal Server Error',
    somethingWentWrong: 'Something went wrong',
    info: 'Information'
  };

  // Rooms
  roomTypeSelector = 0;
  roomNameSelector;
  clientRooms: ClientRoom[];
  roomTypes = {
    bedroom: 'Bedroom',
    livingroom: 'Living Room'
  };

  // Final request
  finalRequest: FinalRequestBOQ;
  constructor(
    private clientProfileservice: ClientProfileService,
    private profileRequirementFormService: ProfileRequirementFormService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: MessageService,
    private confirmationService: ConfirmationService
  ) {

  }

  ngOnInit() {
    this.initializeVariables();

    // get Id from URL
    this.route.queryParams.subscribe(params => {
      this.clientId = params.id;
      this.pageName = params.name;
      this.finalSubmitData.clientId = this.clientId;
      this.getClientSavedBOQDataByClientId();
    });
    this.getClientProfile();
    this.getOnSiteCategories();
    this.getAllOnSiteEntities();
    this.getAllFurnitureEntities();
    this.getAllModularEntities();

  }

  // Initialize variable
  initializeVariables() {
    this.clientProfileData = new ClientProfileResponseData();
    this.clientRooms = [];
    this.searchOptionsFurniture.searchBy = 'item_code';
    this.onSiteRows = [];
    this.onSiteResponseArray = [];
    this.furnitureRows = [];
    this.furnitureResponseArray = [];
    this.modularRows = [];
    this.modularResponseArray = [];
    this.finalSubmitData = new BOQRfFinalSubmitResponse();
    this.finalRequest = new FinalRequestBOQ();
    this.onSiteCategory = '';
  }

  // profile
  getClientProfile() {
    // get Profile Data
    this.clientProfileservice.getProfile(this.clientId).subscribe(
      (response) => {
        if (response.success) {
          this.clientProfileData = response.data;
        }
      }, error => {
        this.errorPopUp(this.toastMsgs.internalServerError, error.message);
      });
  }
  getClientSavedBOQDataByClientId() {
    this.profileRequirementFormService.getClientSavedBOQData(this.clientId).subscribe(response => {
      console.log('profileRequirementFormService----->', response);
      if (response.success) {
        const data = response.data;
        // Fill furniture data
        /*data.furniture.forEach(record => {
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
        });*/
        // Fill Modular Data
        /*data.modular.forEach(record => {
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
        });*/
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
        this.updateOnSiteMainTotal();
        // Fill rooms
        // Fill furniture in rooms
        data.rooms.forEach((room, roomNo) => {
          const tempClientRoom = new ClientRoom();
          tempClientRoom.type = room.type;
          tempClientRoom.name = room.name;
          this.clientRooms.push(tempClientRoom);

          if (room.furniture.length !== 0) {
            this.clientRooms[roomNo].hasFurniture = true
          } else {
            this.clientRooms[roomNo].hasFurniture = false
          }

          room.furniture.forEach(furnitureRecord => {
            const tempFurnitureRecord = new FurnitureRequirementFormData();
            tempFurnitureRecord.id = furnitureRecord.id;
            tempFurnitureRecord.item_code = furnitureRecord.item_code;
            tempFurnitureRecord.item_type = furnitureRecord.item_type;
            tempFurnitureRecord.item_name = furnitureRecord.item_name;
            tempFurnitureRecord.item_description = furnitureRecord.item_description;
            tempFurnitureRecord.unit = furnitureRecord.unit;
            tempFurnitureRecord.rate = furnitureRecord.rate;
            tempFurnitureRecord.breadth = furnitureRecord.breadth;
            tempFurnitureRecord.length = furnitureRecord.length;
            tempFurnitureRecord.height = furnitureRecord.height;
            tempFurnitureRecord.main_rate = furnitureRecord.main_rate;
            tempFurnitureRecord.url = furnitureRecord.url;
            this.clientRooms[roomNo].furnitureRows.push(tempFurnitureRecord);
            const tempFurnitureResponseRecord = new FurnitureResponse(furnitureRecord.id);
            tempFurnitureResponseRecord.quantity = furnitureRecord.quantity;
            tempFurnitureResponseRecord.total = furnitureRecord.total;
            this.clientRooms[roomNo].furnitureResponseArray.push(tempFurnitureResponseRecord);
          });

        });
      }
    }, error => {
      this.errorPopUp(this.toastMsgs.internalServerError, error.message)
    });
  }
  // Room
  addRoom(roomType, roomName) {
    const tempRoom = new ClientRoom();
    tempRoom.type = roomType;
    tempRoom.name = roomName;
    tempRoom.searchModularBy = this.recordSearchOption.itemCode;
    tempRoom.searchFurnitureBy = this.recordSearchOption.itemCode;
    tempRoom.furnitureResponseArray = [];
    tempRoom.furnitureRows = [];
    tempRoom.modularRows = [];
    console.log(tempRoom);
    this.clientRooms.push(tempRoom);
  }
  deleteRoom(roomNo) {
    this.clientRooms.splice(roomNo, 1);
  }
  // On-site
  getOnSiteCategories() {
    // getOnSiteCategories in onSiteCategories
    this.profileRequirementFormService.getOnSiteCategories().
    subscribe(
      (response) => {
        if (response.success) {
          this.onSiteCategories = response.data;
          this.reformatOnSiteCategoriesForSearching();
        }
      },
      (error) => {
        console.error('error in profileRequirementFormService.getOnSiteCategories' , error);
        this.errorPopUp(this.toastMsgs.internalServerError, error.message);
      });
  }
  reformatOnSiteCategoriesForSearching() {
    this.searchOnSite.categories = [];
    this.searchOnSite.categories.push({
      label: 'All', value: {category: ''}
    });
    this.onSiteCategories.forEach(category => {
      this.searchOnSite.categories.push({
        label: category.category, value: category
      });
    });
  }
  reformatOnSiteEntitiesForSearching() {
    this.searchOnSite.entities = [];
    this.onSiteAllEntityData.forEach(entity => {
      this.searchOnSite.entities.push({
        label: entity.item_description, value: entity
      });
    });
  }
  addOnSiteEntry(selectedCategory, selectedEntity) {

    if (selectedCategory === 'allCategories') {
      this.onSiteRows = [];
      this.onSiteResponseArray = [];
      this.getOnSiteDataDetails('');
      setTimeout(() => {this.onSiteAllEntityData.map(entity => this.onSiteRows.push(entity))
        this.onSiteRows.map(entity => {
          const tempOnsiteResponseRecord = new OnSiteResponse(entity.id);
          this.onSiteResponseArray.push(tempOnsiteResponseRecord);
        })}, 1000);

    } else {
      console.log(selectedCategory);
      selectedCategory = selectedCategory.category;
      /*if (!selectedCategory) {
        this.infoPopUp(this.toastMsgs.info, 'Please select category!');
      } else */ if (!selectedEntity) {
        this.infoPopUp(this.toastMsgs.info, 'Please select entity!');
      } else {
        if (this.onSiteRows.some(entity => entity.id === +selectedEntity.id)) {
          this.infoPopUp(this.toastMsgs.info, 'You have already added this element.');
        } else {
          // this.getOnSiteDataDetails(selectedCategory);
          this.onSiteSelectedRow = selectedEntity;
          this.onSiteRows.push(selectedEntity);
          const tempOnsiteResponseRecord = new OnSiteResponse(selectedEntity.id);
          this.onSiteResponseArray.push(tempOnsiteResponseRecord);
        }

      }
    }

  }
  onSiteDelete(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this OnSite entity?',
      accept: () => {
        this.onSiteRows = this.onSiteRows.filter(obj => obj.id !== id)
        this.onSiteResponseArray = this.onSiteResponseArray.filter(obj => obj.id !== id)
        this.updateOnSiteMainTotal();
      }
    });

  }
  onSiteRefresh() {
    this.onSiteRows.length = 0;
    this.onSiteResponseArray.length = 0;
    this.onSiteTotal = 0;
    this.onSiteResponseArray.map(entity => this.onSiteTotal = this.onSiteTotal + entity.total);
  }
  getOnSiteDataDetails(category) {
    console.log('onsite category', category);
    this.profileRequirementFormService.getOnSiteDataDetails(category).
    toPromise().then(
      (response) => {
      if (response.success) {
        this.onSiteAllEntityData = response.data;
        this.reformatOnSiteEntitiesForSearching();
      }
    }).catch(
    (error) => {
      console.log('error in profileRequirementFormService.getOnSiteDataDetails')
      this.errorPopUp(this.toastMsgs.internalServerError, 'Cannot get on site entites!');
    }
    )
  }

  getAllOnSiteEntities() {
    // getOnSiteDataDetails in onSiteAllEntityData
    this.profileRequirementFormService.getOnSiteDataDetails('').
    subscribe(
      (response) => {
        if (response.success) {
          this.onSiteAllEntityData = response.data;
          this.reformatOnSiteEntitiesForSearching();
        }
      },
      (error) => {
        console.error('error in profileRequirementFormService.getOnSiteDataDetails');
        this.errorPopUp(this.toastMsgs.internalServerError, error.message);
      });
  }
  changeOnsiteEntityQuantity(onSiteEntityNumber) {
    this.onSiteResponseArray[onSiteEntityNumber].total = this.onSiteResponseArray[onSiteEntityNumber].quantity * this.onSiteRows[onSiteEntityNumber].rate;
    this.updateOnSiteMainTotal();
  }

  changeOnSiteEntityTotal(onSiteEntityNumber) {
    console.log('changeOnSiteEntityTotal');
    // this.onSiteResponseArray.filter( entity => entity.id == id).map(entity => entity.total = total)
    this.updateOnSiteMainTotal();
  }
  updateOnSiteMainTotal() {
    console.log('updateOnSiteMainTotal');
    this.onSiteTotal = 0;
    this.onSiteResponseArray.map(entity => this.onSiteTotal = this.onSiteTotal + entity.total);
  }
  // furniture
  addFurnitureEntry(selectedEntity, roomNo) {
    if (!selectedEntity) {
      this.infoPopUp(this.toastMsgs.info, 'Please select entity!');
    } else if (this.filterAddedFurnitureRows(selectedEntity, roomNo).length !== 0) {
      this.infoPopUp(this.toastMsgs.info, 'You have already added this element!');
    } else {
      this.furnitureSelectedRow = this.filterAllFurnitureData(selectedEntity, roomNo);
      this.clientRooms[roomNo].furnitureRows.push(this.furnitureSelectedRow[0]);
      const tempFurnitureResponseRecord = new FurnitureResponse(this.furnitureSelectedRow[0].id);
      this.clientRooms[roomNo].furnitureResponseArray.push(tempFurnitureResponseRecord);
    }
  }
  filterAllFurnitureData(selectedEntity, roomNo) {
    return this.furnitureAllEntityData.filter(entity => {
      if (this.clientRooms[roomNo].searchFurnitureBy === 'item_code') {
        return entity.item_code === selectedEntity
      } else {
        return entity.item_description.replace(/\s/g, '') === selectedEntity.replace(/\s/g, '')
      }
    });
  }
  filterAddedFurnitureRows(selectedEntity, roomNo) {
    return this.clientRooms[roomNo].furnitureRows.filter(entity => {
      if (this.clientRooms[roomNo].searchFurnitureBy === 'item_code') {
        return entity.item_code === selectedEntity
      } else {
        return (entity.item_description === selectedEntity)
      }
    });
  }
  furnitureDelete(id, roomNo) {
    this.clientRooms[roomNo].furnitureRows = this.clientRooms[roomNo].furnitureRows.filter(obj => obj.id !== id);
    this.clientRooms[roomNo].furnitureResponseArray = this.clientRooms[roomNo].furnitureResponseArray.filter(obj => obj.id !== id);
    this.furnitureTotal = 0;
    this.clientRooms[roomNo].furnitureResponseArray.map(entity => this.furnitureTotal = this.furnitureTotal + entity.total);
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
  changeFurnitureSearchType(type, roomNo) {
    // console.log('Furniture search type--->', type);
    // this.searchOptionsFurniture.searchBy = type;
    this.clientRooms[roomNo].searchFurnitureBy = type
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
    this.furnitureResponseArray.filter( entity => entity.id == id).map(entity => entity.total = total)
    this.furnitureTotal = 0;
    this.furnitureResponseArray.map(entity => this.furnitureTotal = this.furnitureTotal + entity.total)
  }
  getAllFurnitureEntities() {
    // getFurnitureDataDetails in furnitureAllEntityData
    this.profileRequirementFormService.getFurnitureDataDetails('').
    subscribe(
      (response) => {
        if (response.success) {
          this.furnitureAllEntityData = response.data;
        }
      },
      (error) => {
        console.log('error in profileRequirementFormService.getFurnitureDataDetails');
        this.errorPopUp(this.toastMsgs.internalServerError, error.message);
      });
  }
  getAllFurnitureCategories() {
    // getFurnitureCategories in furnitureCategories
    this.profileRequirementFormService.getFurnitureCategories().
    subscribe(
      (response) => {
        if (response.success) {
          this.furnitureCategories = response.data;
        }
      },
      (error) => {
        console.log('error in profileRequirementFormService.getFurnitureCategories');
        this.errorPopUp(this.toastMsgs.internalServerError, error.message);
      });
  }

  // modular
  addModularEntry(selectedModular) {
    if (!selectedModular) {
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
  filterModularRows(selectedModular) {
    return this.modularRows.filter(entity => {
      if (this.searchOptionsModular.searchBy === 'item_code') {
        return entity.item_code === selectedModular
      } else {
        return entity.item_description.replace(/\s/g, '') === selectedModular.replace(/\s/g, '')
      }
    });
  }
  filterModularAllEntityData(selectedModular) {
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
  changeModularSearchType(searchType) {
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
  getAllModularEntities() {
    // getModularDataDetails in modularAllEntityData
    this.profileRequirementFormService.getModularDataDetails('').
    subscribe(
      (response) => {
        if (response.success) {
          this.modularAllEntityData = response.data;
        }
      },
      (error) => {
        console.log('error in profileRequirementFormService.getModularDataDetails');
        this.errorPopUp(this.toastMsgs.internalServerError, error.message);
      });

  }
  getAllModularCategories() {
    // getModularCategories in modularCategories
    this.profileRequirementFormService.getModularCategories().
    subscribe(
      (response) => {
        if (response.success) {
          this.modularCategories = response.data;
        }
      },
      (error) => {
        console.log('error in profileRequirementFormService.getModularCategories');
        this.errorPopUp(this.toastMsgs.internalServerError, error.message);
      });
  }

  // finalSubmitButton
  sendFinalData() {
 /*   this.finalSubmitData.onsite = this.onSiteResponseArray;
    this.finalSubmitData.furniture = this.furnitureResponseArray;
    this.finalSubmitData.modular = this.modularResponseArray;
    if (this.onSiteResponseArray.length !== 0 || this.furnitureResponseArray.length !== 0 || this.modularResponseArray.length !== 0 ) {
      console.log('FInal submit data---->>>>>', this.finalSubmitData)
      this.profileRequirementFormService.sendFinalSubmitData(this.finalSubmitData)
        .subscribe(response => {
          if (response.success) {
            this.toast.add({severity: 'success', summary: 'Success', detail: 'Data Saved'});
            // alert('Your Data has been Successfully Submitted!');
            // this.router.navigate(['/dashboard/designerClientMet']);
            console.log('final response after success', this.finalSubmitData)
          } else {
            console.log('final response after failure ', this.finalSubmitData);
            this.toast.add({severity: 'error', summary: 'Error', detail: 'Something went wrong'});
          }
        })
    } else {
      alert('Please add Atleast a Field')
    }
*/
    this.finalRequest.onsite = this.onSiteResponseArray;
    this.clientRooms.forEach((room, roomNo) => {
      this.finalRequest.rooms[roomNo].furniture = room.furnitureResponseArray;
      // this.finalRequest.rooms[roomNo].modular = room.furnitureResponseArray;

    });
    console.log('Final request ----->>', this.finalRequest);
  }
  generateBOQPDF() {
    this.profileRequirementFormService.getPDFUrl(this.clientId).subscribe(response => {
      console.log('Generate PDF BOQ URL response ---->', response);
      const res = response as BasicResponse;
      if (res.success) {
        const filename = res.data.pdfUrl;
        this.toast.add({severity: 'success', summary: 'Success', detail: 'PDF generated'});
        // const url = this.env.backendURL + `/static/${filename}`;
        window.open(filename);
      } else {
        this.toast.add({severity: 'error', summary: 'Error', detail: 'Something went wrong!'});
      }
    }, error => {
      this.toast.add({severity: 'error', summary: 'Error', detail: 'Something went wrong!'});
    });
  }

  // Toast
  errorPopUp(type, message) {
    this.toast.add({
      severity: 'error',
      summary: type,
      detail: message,
      closable: true,
      sticky: false,
      life: 4000
    });
  }
  infoPopUp(type, message) {
    this.toast.add({
      severity: 'info',
      summary: type,
      detail: message,
      closable: true,
      sticky: false,
      life: 4000
    });
  }
  successPopUp(summary, message) {
    this.toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Saved',
      closable: true,
      sticky: false,
      life: 3000
    });
  }
}
