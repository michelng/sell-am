package com.mngsolution.sellam.service.impl;

import com.mngsolution.sellam.domain.Entreprise;
import com.mngsolution.sellam.repository.EntrepriseRepository;
import com.mngsolution.sellam.service.EntrepriseService;
import com.mngsolution.sellam.service.dto.EntrepriseDTO;
import com.mngsolution.sellam.service.mapper.EntrepriseMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Entreprise}.
 */
@Service
@Transactional
public class EntrepriseServiceImpl implements EntrepriseService {

    private final Logger log = LoggerFactory.getLogger(EntrepriseServiceImpl.class);

    private final EntrepriseRepository entrepriseRepository;

    private final EntrepriseMapper entrepriseMapper;

    public EntrepriseServiceImpl(EntrepriseRepository entrepriseRepository, EntrepriseMapper entrepriseMapper) {
        this.entrepriseRepository = entrepriseRepository;
        this.entrepriseMapper = entrepriseMapper;
    }

    @Override
    public EntrepriseDTO save(EntrepriseDTO entrepriseDTO) {
        log.debug("Request to save Entreprise : {}", entrepriseDTO);
        Entreprise entreprise = entrepriseMapper.toEntity(entrepriseDTO);
        entreprise = entrepriseRepository.save(entreprise);
        return entrepriseMapper.toDto(entreprise);
    }

    @Override
    public EntrepriseDTO update(EntrepriseDTO entrepriseDTO) {
        log.debug("Request to update Entreprise : {}", entrepriseDTO);
        Entreprise entreprise = entrepriseMapper.toEntity(entrepriseDTO);
        entreprise = entrepriseRepository.save(entreprise);
        return entrepriseMapper.toDto(entreprise);
    }

    @Override
    public Optional<EntrepriseDTO> partialUpdate(EntrepriseDTO entrepriseDTO) {
        log.debug("Request to partially update Entreprise : {}", entrepriseDTO);

        return entrepriseRepository
            .findById(entrepriseDTO.getId())
            .map(existingEntreprise -> {
                entrepriseMapper.partialUpdate(existingEntreprise, entrepriseDTO);

                return existingEntreprise;
            })
            .map(entrepriseRepository::save)
            .map(entrepriseMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EntrepriseDTO> findAll() {
        log.debug("Request to get all Entreprises");
        return entrepriseRepository.findAll().stream().map(entrepriseMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<EntrepriseDTO> findOne(Long id) {
        log.debug("Request to get Entreprise : {}", id);
        return entrepriseRepository.findById(id).map(entrepriseMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Entreprise : {}", id);
        entrepriseRepository.deleteById(id);
    }
}
